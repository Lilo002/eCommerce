import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CheckboxProps } from 'antd';
import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import MaskedInput from 'antd-mask-input';

import { ROUTES } from '../../shared/constants';

import * as validation from './model/validation';

import './_page.scss';

const countries = [
  { country: 'Belarus', mask: '00-00-00', postalCode: '11-11-11', pattern: /^\d{2}-\d{2}-\d{2}$/ },
  { country: 'Canada', mask: 'A0A 0A0', postalCode: 'A1A 1A1', pattern: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/ },
  { country: 'Poland', mask: '00-000', postalCode: '11-111', pattern: /^\d{2}-\d{3}$/ },
  { country: 'US', mask: '00000', postalCode: '11111', pattern: /^\d{5}$/ },
];

export function RegistrationPage() {
  // shipping adress
  const [shippingCountry, setShippingCountry] = useState(countries[0]);
  const [shippingPostalCodeRules, setShippingPostalCodeRules] = useState([
    { pattern: countries[0].pattern, message: validation.messageForPostalCodeError },
  ]);

  const changeShippingCountry = (index: number) => {
    setShippingCountry(countries[index]);
    setShippingPostalCodeRules([{ pattern: countries[index].pattern, message: validation.messageForPostalCodeError }]);
  };

  // billing adress
  const [billingCountry, setBillingCountry] = useState(countries[0]);
  const [billingPostalCodeRules, setBillingPostalCodeRules] = useState([
    { pattern: countries[0].pattern, message: validation.messageForPostalCodeError },
  ]);

  const changeBillingCountry = (index: number) => {
    setBillingCountry(countries[index]);
    setBillingPostalCodeRules([{ pattern: countries[index].pattern, message: validation.messageForPostalCodeError }]);
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

  // const cleanInputs = () => {
  //   setEmail('');
  //   setPassword('');
  // };

  // const onFormSubmit = () => {
  //   session
  //     ?.login({ email, password })
  //     .then(() => {
  //       cleanInputs();
  //       navigate(ROUTES.MAIN);
  //     })
  //     .catch((error: Error) => {
  //       message.error(`Login error: ${error.message}`);
  //     });
  // };

  return (
    <Form
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
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={validation.textRules('Last name')}
          validateFirst
          hasFeedback
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Date of birth" rules={validation.ageRules}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={validation.emailRules} validateFirst hasFeedback>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={validation.passwordRules} validateFirst hasFeedback>
          <Input.Password style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="defaultShippingAdress">
          <Checkbox checked={defaulShippingAdress} onChange={changeDefaultShippingAdress}>
            Set as default shipping address
          </Checkbox>
        </Form.Item>

        <Form.Item name="setAsBillingdress">
          <Checkbox checked={shippingAdressAsBilingAdress} onChange={toggleBillingAdress}>
            Set as billing address
          </Checkbox>
        </Form.Item>

        <p>Shipping adress: </p>
        <div className="shipping-adress-content">
          <Form.Item
            name="shippingCountry"
            label="Country"
            initialValue={shippingCountry.country}
            rules={validation.countryRules}
          >
            <Select
              style={{ width: '100%' }}
              onChange={(value) => {
                changeShippingCountry(value);
              }}
            >
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
            rules={shippingPostalCodeRules}
            initialValue={shippingCountry.postalCode}
          >
            <MaskedInput mask={shippingCountry.mask} value={shippingCountry.postalCode} />
          </Form.Item>
          <Form.Item name="shippingStreet" label="Street" rules={validation.streetRules}>
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="shippingCity" label="City" rules={validation.textRules('City')}>
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div className="billing-adress" style={{ display: shippingAdressAsBilingAdress ? 'none' : 'block' }}>
          <p>Billing adress: </p>
          <Form.Item name="defaultBillingAdress">
            <Checkbox checked={defaulBillingAdress} onChange={changeDefaultBillingAdress}>
              Set as default billing address
            </Checkbox>
          </Form.Item>
          <div className="billing-adress-content">
            <Form.Item
              name="billingCountry"
              label="Country"
              initialValue={billingCountry.country}
              rules={validation.countryRules}
            >
              <Select
                style={{ width: '100%' }}
                onChange={(value) => {
                  changeBillingCountry(value);
                }}
              >
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
              rules={billingPostalCodeRules}
              initialValue={billingCountry.postalCode}
            >
              <MaskedInput mask={billingCountry.mask} value={billingCountry.postalCode} />
            </Form.Item>
            <Form.Item name="billingStreet" label="Street" rules={validation.streetRules}>
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="billibgCity" label="City" rules={validation.textRules('City')}>
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </div>
        </div>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            CREATE ACCOUNT
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
