import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, DatePicker, Form, Input, Select } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import MaskedInput from 'antd-mask-input';

import { ROUTES } from '../../shared/constants';

import * as validation from './model/validation';

import './_page.scss';

const countryMasks = {
  Belarus: '00-00-00',
  Canada: '00-00-00',
  Poland: '00-000',
  US: '00-000',
};

export function RegistrationPage() {
  const [countryValue, setCountryValue] = useState('Poland');
  const [postalCodeMask, setPostalCodeMask] = useState('00-000');
  const [postalCodeValue, setPostalCodeValue] = useState('00-000');

  const changeCountry = (value: string) => {
    setCountryValue(value);
    const currentMask = countryMasks[value as keyof typeof countryMasks];
    setPostalCodeMask(currentMask);
    setPostalCodeValue('');
  };

  return (
    <Form
      labelCol={{ span: 4 }}
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

        <Form.Item name="country" label="Country" initialValue={countryValue} rules={validation.countryRules}>
          <Select
            style={{ width: '100%' }}
            onChange={(value) => {
              changeCountry(value);
            }}
          >
            <Select.Option value="Belarus">Belarus</Select.Option>
            <Select.Option value="Canada">Canada</Select.Option>
            <Select.Option value="Poland">Poland</Select.Option>
            <Select.Option value="US">Unated States</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="postalCode" label="Postal code" rules={validation.postalCodeRules}>
          <MaskedInput
            mask={postalCodeMask}
            value={postalCodeValue}
            onChange={(e) => {
              setPostalCodeValue(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item name="street" label="Street" rules={validation.streetRules}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="city" label="City" rules={validation.textRules('City')}>
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button type="primary" htmlType="submit">
            CREATE ACCOUNT
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
