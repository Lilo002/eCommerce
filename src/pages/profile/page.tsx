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
    <div className="profile">
      <div className="profile-name">{session?.userData?.email}</div>
      <Tabs
        className="profile-tabs"
        tabPosition="left"
        activeKey={activeTab}
        onChange={onTabChange}
        items={[
          {
            label: 'General',
            key: '1',
            children: (
              <div className="general-container">
    <Form
                  form={form}
      onFinish={handleSaveChanges}
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 24 }}
                  className="general-form"
      autoComplete="off"
      layout="vertical"
    >
                  <div className="general-info">
                    <span className="general-title">PROFILE</span>
                    {!isEdit && (
                      <Button shape="circle" type="text" onClick={() => setIsEdit(true)}>
                        <EditOutlined />
                      </Button>
                    )}
      </div>
                  <div className="tab-content general">
        <Form.Item
          name="firstName"
          label="First name:"
                      rules={isEdit ? validation.textRules('First name') : validation.textRulesDisabled('disabled')}
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
                      rules={isEdit ? validation.textRules('Last name') : validation.textRulesDisabled('disabled')}
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
                    <Form.Item
                      name="dateOfBirth"
                      label="Date of birth"
                      rules={isEdit ? validation.ageRules : validation.ageRulesDisabled}
                      initialValue={dayjs(dateOfBirth, 'YYYY-MM-DD')}
                    >
          <DatePicker
            disabled={!isEdit}
            placeholder={dateOfBirth || ''}
            className="full-width"
            onChange={onDateOfBirthChange}
          />
        </Form.Item>
      </div>

                  {isEdit && (
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      )}
    </Form>
              </div>
            ),
          },
          {
            label: 'Addresses',
            key: '2',
            children: <Card style={{ width: '100%' }}>Content of Tab 2</Card>,
          },
        ]}
      />
    </div>
  );
}
