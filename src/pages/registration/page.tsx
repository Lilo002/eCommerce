import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CheckboxProps } from 'antd';
import { Button, Checkbox, DatePicker, Form, Input, message, Select } from 'antd';
import { MaskedInput } from 'antd-mask-input';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { countries } from './model/countries';
import { prepareRegisterInfoToRequest, RegistrationInformation } from './model/dataToRequest';
import * as validation from './model/validation';

import './_page.scss';

export function RegistrationPage() {
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [registrationForm] = Form.useForm();
  // shipping address
  const [shippingCountry, setShippingCountry] = useState(countries[0]);

  const changeShippingCountry = (index: number) => {
    setShippingCountry(countries[index]);
  };

  const handleChangeShippingCountry = (index: number) => {
    changeShippingCountry(index);
  };

  // billing address
  const [billingCountry, setBillingCountry] = useState(countries[0]);

  const changeBillingCountry = (index: number) => {
    setBillingCountry(countries[index]);
  };

  const handleChangeBillingCountry = (index: number) => {
    changeBillingCountry(index);
  };

  // checkboxes
  const [shippingAddressAsBillingAddress, setShippingAddressAsBillingAddress] = useState(true);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(true);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(true);

  const toggleBillingAddress: CheckboxProps['onChange'] = (e) => {
    setShippingAddressAsBillingAddress(e.target.checked);
  };

  const changeDefaultShippingAddress: CheckboxProps['onChange'] = (e) => {
    setDefaultShippingAddress(e.target.checked);
  };

  const changeDefaultBillingAddress: CheckboxProps['onChange'] = (e) => {
    setDefaultBillingAddress(e.target.checked);
  };

  const isDefaultBillingAddress = (): boolean => {
    if (!shippingAddressAsBillingAddress) {
      return defaultBillingAddress;
    }
    if (!defaultShippingAddress && shippingAddressAsBillingAddress) {
      return false;
    }
    return true;
  };

  const getInformationFromForm = (): RegistrationInformation => {
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      shippingPostalCode,
      shippingStreet,
      shippingCity,
      billingPostalCode,
      billingStreet,
      billingCity,
    } = registrationForm.getFieldsValue();
    return {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      defaultShippingAddress,
      setAsBillingAddress: shippingAddressAsBillingAddress,
      shippingCountry: shippingCountry.country,
      shippingPostalCode,
      shippingStreet,
      shippingCity,
      defaultBillingAddress: isDefaultBillingAddress(),
      billingCountry: billingCountry.country,
      billingPostalCode,
      billingStreet,
      billingCity,
    };
  };

  const cleanInputs = () => {
    registrationForm.resetFields();
    setShippingCountry(countries[0]);
    setBillingCountry(countries[0]);
    setShippingAddressAsBillingAddress(true);
    setDefaultShippingAddress(true);
    setDefaultBillingAddress(true);
  };

  const handlerFormSubmit = () => {
    const info = getInformationFromForm();
    const { email, password, firstName, lastName, dateOfBirth, addresses } = prepareRegisterInfoToRequest(info);
    session
      ?.register(
        {
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          addresses,
        },
        info.defaultShippingAddress,
        info.defaultBillingAddress,
      )
      .then(() => {
        cleanInputs();
        navigate(ROUTES.MAIN);
      })
      .catch(() => message.error('Customer with the given email already exists'));
  };

  return (
    <Form
      form={registrationForm}
      onFinish={handlerFormSubmit}
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 24 }}
      className="registration-form"
      autoComplete="off"
      layout="vertical"
    >
      <div className="registration-info">
        <span className="registration-title">Registration</span>
        <Link to={ROUTES.LOGIN} className="registration-login">
          Already have an account? Sign In
        </Link>
      </div>
      <div className="registration-content">
        <Form.Item
          name="firstName"
          label="First name:"
          rules={validation.textRules('First name')}
          validateFirst
          hasFeedback
        >
          <Input className="full-width" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          rules={validation.textRules('Last name')}
          validateFirst
          hasFeedback
        >
          <Input className="full-width" />
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of birth" rules={validation.ageRules}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={validation.emailRules} validateFirst hasFeedback>
          <Input className="full-width" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={validation.passwordRules} validateFirst hasFeedback>
          <Input.Password className="full-width" />
        </Form.Item>
        <Form.Item name="defaultShippingAddress">
          <Checkbox checked={defaultShippingAddress} onChange={changeDefaultShippingAddress}>
            Set as default {shippingAddressAsBillingAddress ? 'shipping/billing' : 'shipping'} address
          </Checkbox>
        </Form.Item>
        <Form.Item name="setAsBillingAddress">
          <Checkbox checked={shippingAddressAsBillingAddress} onChange={toggleBillingAddress}>
            Set as billing address
          </Checkbox>
        </Form.Item>
        <p>Shipping address: </p>
        <div className="shipping-address-content">
          <Form.Item name="shippingCountry" label="Country" initialValue={0} rules={validation.countryRules}>
            <Select className="full-width" onChange={handleChangeShippingCountry}>
              {countries.map((country, index) => (
                <Select.Option value={index} key={country.country}>
                  {country.country}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="shippingPostalCode"
            label="Postal code"
            rules={[{ pattern: shippingCountry.pattern, message: validation.messageForPostalCodeError }]}
            initialValue={shippingCountry.postalCode}
          >
            <MaskedInput mask={shippingCountry.mask} value={shippingCountry.postalCode} />
          </Form.Item>
          <Form.Item name="shippingStreet" label="Street" rules={validation.streetRules}>
            <Input className="full-width" />
          </Form.Item>
          <Form.Item name="shippingCity" label="City" rules={validation.textRules('City')}>
            <Input className="full-width" />
          </Form.Item>
        </div>

        {!shippingAddressAsBillingAddress && (
          <div className="billing-address">
            <p>Billing address: </p>
            <Form.Item name="defaultBillingAddress">
              <Checkbox checked={defaultBillingAddress} onChange={changeDefaultBillingAddress}>
                Set as default billing address
              </Checkbox>
            </Form.Item>
            <div className="billing-address-content">
              <Form.Item name="billingCountry" label="Country" initialValue={0} rules={validation.countryRules}>
                <Select className="full-width" onChange={handleChangeBillingCountry}>
                  {countries.map((country, index) => (
                    <Select.Option value={index} key={country.country}>
                      {country.country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="billingPostalCode"
                label="Postal code"
                rules={[{ pattern: billingCountry.pattern, message: validation.messageForPostalCodeError }]}
                initialValue={billingCountry.postalCode}
              >
                <MaskedInput mask={billingCountry.mask} value={billingCountry.postalCode} />
              </Form.Item>
              <Form.Item name="billingStreet" label="Street" rules={validation.streetRules}>
                <Input className="full-width" />
              </Form.Item>
              <Form.Item name="billingCity" label="City" rules={validation.textRules('City')}>
                <Input className="full-width" />
              </Form.Item>
            </div>
          </div>
        )}
        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            CREATE ACCOUNT
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
