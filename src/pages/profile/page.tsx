import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { Button, DatePicker, Form, Input } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';
import * as validation from '../registration/model/validation';

export function ProfilePage() {
  const session = {
    userData: {
      firstName: 'lisa',
      lastName: 'basarab',
      dateOfBirth: '2000-12-12',
    },
  };

  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState<Customer['firstName'] | null>(session.userData.firstName);
  const [lastName, setLastName] = useState<Customer['lastName'] | null>(session.userData.lastName);
  const [dateOfBirth, setDateOfBirth] = useState<Customer['dateOfBirth'] | null>(session.userData.dateOfBirth);

  /*   useEffect(() => {
    if (session && session.userData) {
      setFirstName(session.userData.firstName);
      setLastName(session.userData.lastName);
      setDateOfBirth(session.userData.dateOfBirth);
    } else {
      setFirstName(null);
      setLastName(null);
      setDateOfBirth(null);
    }
  }, [isEdit]); */

  const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setDateOfBirth(e);
  };
  /*   const handleInputChange = (e) => {}; */

  const handleSaveChanges = () => {
    console.log('Сохранение изменений:', firstName, lastName, dateOfBirth);
    isEdit ? setIsEdit(false) : setIsEdit(true);
  };

  return (
    <Form
      onFinish={handleSaveChanges}
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 24 }}
      className="registration-form"
      autoComplete="off"
      layout="vertical"
    >
      <div className="registration-info">
        <span className="registration-title">Registration</span>
        <Link to={ROUTES.LOGIN} className="registration-login">
          <span className="registration-subtitle">Already have an account? </span>
          Sign In
        </Link>
      </div>
      <div className="registration-content">
        <Form.Item
          name="firstName"
          label="First name:"
          rules={validation.textRules('First name')}
          validateFirst
          hasFeedback
          initialValue={firstName}
        >
          <Input
            placeholder={firstName || ''}
            value={firstName || ''}
            onChange={onFirstNameChange}
            className="full-width"
            disabled={!isEdit}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          rules={validation.textRules('Last name')}
          validateFirst
          hasFeedback
          initialValue={lastName}
        >
          <Input
            placeholder={lastName || ''}
            value={lastName || ''}
            onChange={onLastNameChange}
            className="full-width"
            disabled={!isEdit}
          />
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of birth" rules={validation.ageRules}>
          <DatePicker
            disabled={!isEdit}
            placeholder={dateOfBirth || ''}
            className="full-width"
            onChange={onDateOfBirthChange}
          />
        </Form.Item>
      </div>

      {isEdit ? (
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      ) : (
        <Button type="primary" onClick={() => setIsEdit(true)} htmlType="button">
          Edit Profile
        </Button>
      )}
    </Form>
  );
}
