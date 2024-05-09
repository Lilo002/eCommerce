import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CheckboxProps } from 'antd';
import { Button, Checkbox, DatePicker, Form, Input, message, Select } from 'antd';
import MaskedInput from 'antd-mask-input';

import { Header } from '../../components/header/header';
import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { countries } from './model/countries';
import { prepareRegisterInfoToRequest, RegistationInformation } from './model/dataToRequest';
import * as validation from './model/validation';

import './_page.scss';

export function RegistrationPage() {
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [registrationForm] = Form.useForm();
  // shipping adress
  const [shippingCountry, setShippingCountry] = useState(countries[0]);

  const changeShippingCountry = (index: number) => {
    setShippingCountry(countries[index]);
  };

  const handleChangeShippingCountry = (index: number) => {
    changeShippingCountry(index);
  };

  // billing adress
  const [billingCountry, setBillingCountry] = useState(countries[0]);

  const changeBillingCountry = (index: number) => {
    setBillingCountry(countries[index]);
  };

  const handleChangeBillingCountry = (index: number) => {
    changeBillingCountry(index);
  };

  // checkboxes
  const [shippingAdressAsBilingAdress, setShippingAdressAsBillingAdress] = useState(true);
  const [defaulShippingAdress, setDefaultShippingAdress] = useState(true);
  const [defaulBillingAdress, setDefaultBillingAdress] = useState(true);

  const toggleBillingAdress: CheckboxProps['onChange'] = (e) => {
    setShippingAdressAsBillingAdress(e.target.checked);
  };

  const changeDefaultShippingAdress: CheckboxProps['onChange'] = (e) => {
    setDefaultShippingAdress(e.target.checked);
  };

  const changeDefaultBillingAdress: CheckboxProps['onChange'] = (e) => {
    setDefaultBillingAdress(e.target.checked);
  };

  const isDefaultBillingAdress = (): boolean => {
    if (!shippingAdressAsBilingAdress) {
      return defaulBillingAdress;
    }
    if (!defaulShippingAdress && shippingAdressAsBilingAdress) {
      return false;
    }
    return true;
  };

  const getInformationFromForm = (): RegistationInformation => {
    const info = registrationForm.getFieldsValue();
    return {
      firstName: info.firstName,
      lastName: info.lastName,
      dateOfBirth: info.dateOfBirth,
      email: info.email,
      password: info.password,
      defaultShippingAdress: defaulShippingAdress,
      setAsBillingdress: shippingAdressAsBilingAdress,
      shippingCountry: info.shippingCountry,
      shippingPostalCode: info.shippingPostalCode,
      shippingStreet: info.shippingStreet,
      shippingCity: info.shippingCity,
      defaultBillingAdress: isDefaultBillingAdress(),
      billingCountry: info.billingCountry,
      billingPostalCode: info.billingPostalCode,
      billingStreet: info.billingStreet,
      billingCity: info.billingCity,
    };
  };

  const cleanInputs = () => {
    registrationForm.resetFields();
    setShippingCountry(countries[0]);
    setBillingCountry(countries[0]);
    setShippingAdressAsBillingAdress(true);
    setDefaultShippingAdress(true);
    setDefaultBillingAdress(true);
  };

  const handlerFormSubmit = () => {
    const info = getInformationFromForm();
    const newCustomer = prepareRegisterInfoToRequest(info);
    session
      ?.register(
        {
          email: newCustomer.email,
          password: newCustomer.password,
          firstName: newCustomer.firstName,
          lastName: newCustomer.lastName,
          dateOfBirth: newCustomer.dateOfBirth,
          addresses: newCustomer.addresses,
        },
        info.defaultShippingAdress,
        info.defaultBillingAdress,
      )
      .then(() => {
        cleanInputs();
        navigate(ROUTES.MAIN);
      })
      .catch((error: Error) => {
        message.error(`Registration error: ${error.message}`);
      });
  };

  return (
    <>
      <Header />
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
          <Form.Item name="defaultShippingAdress">
            <Checkbox checked={defaulShippingAdress} onChange={changeDefaultShippingAdress}>
              Set as default {shippingAdressAsBilingAdress ? 'shipping/billing' : 'shipping'} address
            </Checkbox>
          </Form.Item>
          <Form.Item name="setAsBillingdress">
            <Checkbox checked={shippingAdressAsBilingAdress} onChange={toggleBillingAdress}>
              Set as billing address
            </Checkbox>
          </Form.Item>
          <p>Shipping adress: </p>
          <div className="shipping-adress-content">
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

          {!shippingAdressAsBilingAdress && (
            <div className="billing-adress">
              <p>Billing adress: </p>
              <Form.Item name="defaultBillingAdress">
                <Checkbox checked={defaulBillingAdress} onChange={changeDefaultBillingAdress}>
                  Set as default billing address
                </Checkbox>
              </Form.Item>
              <div className="billing-adress-content">
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
    </>
  );
}
