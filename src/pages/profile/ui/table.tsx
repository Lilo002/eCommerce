import { useContext, useState } from 'react';
import { Address } from '@commercetools/platform-sdk';
import { Button, Checkbox, Form, Input, Modal, Select, Switch, Table, Tag } from 'antd';
import { MaskedInput } from 'antd-mask-input';

import { sessionContext } from '../../../context/sessionContext';
import { countries, CountriesNames, CountryType } from '../model/countries';
import * as validation from '../model/validation';

import '../_page.scss';

export function AddressesTable({
  closeAddModal,
  isAddModalOpen,
}: {
  closeAddModal: () => void;
  isAddModalOpen: boolean;
}) {
  const [form] = Form.useForm();
  const { session } = useContext(sessionContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [isBilling, setIsBilling] = useState(false);
  const [isShipping, setIsShipping] = useState(false);

  const [currentCountry, setCurrentCountry] = useState<CountryType>(countries[0]);

  const isBillingAddress = (id: Address['id']): boolean => {
    if (session?.userData?.billingAddressIds && id) {
      return session?.userData?.billingAddressIds?.includes(id);
    }
    return false;
  };

  const isBillingDefault = (id: Address['id']): boolean => session?.userData?.defaultBillingAddressId === id;

  const isShippingAddress = (id: Address['id']): boolean => {
    if (session?.userData?.shippingAddressIds && id) {
      return session?.userData?.shippingAddressIds?.includes(id);
    }
    return false;
  };

  const isShippingDefault = (id: Address['id']): boolean => session?.userData?.defaultShippingAddressId === id;

  const editModal = (addressData: Address) => {
    setIsModalOpen(true);
    setEditingAddress(addressData);

    setCurrentCountry(countries.find((country) => country.country === addressData.country) ?? countries[0]);
    const { postalCode, city, country, streetName } = addressData;
    console.log(postalCode);
    if (country) {
      form.setFieldsValue({
        postalCode,
        city,
        country: CountriesNames[country],
        streetName,
        defaultShippingAddress: isShippingDefault(addressData.id),
        defaultBillingAddress: isBillingDefault(addressData.id),
        billingAddress: isBillingAddress(addressData.id),
        shippingAddress: isShippingAddress(addressData.id),
      });
    }

    setIsBilling(isBillingAddress(addressData.id));
    setIsShipping(isShippingAddress(addressData.id));
  };

  const handleClick = (record: Address) => {
    editModal(record);
  };

  const columns = [
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'StreetName',
      dataIndex: 'streetName',
      key: 'streetName',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      key: 'postalCode',
    },
    {
      title: 'Type',
      key: 'type',
      render: (_: React.ReactNode, { id }: Address) => (
        <>
          {isBillingAddress(id) && (
            <Tag color={isBillingDefault(id) ? 'orange' : 'black'}>
              {isBillingDefault(id) ? 'default billing' : 'billing'}
            </Tag>
          )}
          {isShippingAddress(id) && (
            <Tag color={isShippingDefault(id) ? 'orange' : 'black'}>
              {isShippingDefault(id) ? 'default shipping' : 'shipping'}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Address) => (
        <>
          <Button type="primary" onClick={() => handleClick(record)}>
            Edit
          </Button>
          <Button danger style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const resetModalState = () => {
    form.resetFields();
    setIsBilling(false);
    setIsShipping(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    setCurrentCountry(countries[0]);
    resetModalState();
    closeAddModal();
  };

  const handleSaveChanges = () => {
    const data = form.getFieldsValue();
    console.log('Сохранение изменений:', data);
  };

  const handleChangeShippingCountry = (index: number) => {
    setCurrentCountry(countries[index]);
  };

  return (
    <>
      <Table dataSource={session?.userData?.addresses} columns={columns} rowKey="id" />
      <Modal
        className="modal"
        open={isModalOpen || isAddModalOpen}
        title={editingAddress ? 'Edit Address' : 'Add Address'}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          initialValues={{
            postalCode: '',
            city: '',
            country: countries[0].country,
            streetName: '',
            defaultShippingAddress: false,
            defaultBillingAddress: false,
            billingAddress: false,
            shippingAddress: false,
          }}
          layout="horizontal"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSaveChanges}
          onValuesChange={(_, values) => {
            setIsBilling(values.billingAddress);
            setIsShipping(values.shippingAddress);
          }}
        >
          <div className="modal-switch-container">
            <Form.Item
              labelCol={{ span: 22 }}
              label="Set as shipping address"
              name="shippingAddress"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            {isShipping && (
              <Form.Item labelCol={{ span: 15 }} label="Default" name="defaultShippingAddress">
                <Switch />
              </Form.Item>
            )}
          </div>
          <div className="modal-switch-container">
            <Form.Item
              labelCol={{ span: 22 }}
              label="Set as billing address"
              name="billingAddress"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            {isBilling && (
              <Form.Item labelCol={{ span: 15 }} label="Default" name="defaultBillingAddress">
                <Switch />
              </Form.Item>
            )}
          </div>
          <div className="shipping-address-content">
            <Form.Item name="country" label="Country" rules={validation.countryRules}>
              <Select className="full-width" onChange={handleChangeShippingCountry}>
                {countries.map((country, index) => (
                  <Select.Option value={index} key={country.country}>
                    {country.country}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="postalCode"
              label="Postal code"
              rules={[{ pattern: currentCountry.pattern, message: validation.messageForPostalCodeError }]}
            >
              <MaskedInput mask={currentCountry.mask} key={Math.random()} value={currentCountry.postalCode} />
            </Form.Item>
            <Form.Item name="streetName" label="Street" rules={validation.streetRules}>
              <Input className="full-width" />
            </Form.Item>
            <Form.Item name="city" label="City" rules={validation.textRules('City')}>
              <Input className="full-width" />
            </Form.Item>
          </div>

          <div className="modal-buttons">
            <Button className="modal-cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="modal-save" type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
