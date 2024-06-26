import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Customer } from '@commercetools/platform-sdk';
import { Button, DatePicker, Form, Input, message, Tabs } from 'antd';
import dayjs from 'dayjs';

import { sessionContext } from '../../context/sessionContext';
import { UpdateCustomerDraft } from '../../sdk/api';
import { getCookie } from '../../sdk/client/ClientBuilder';
import { ROUTES } from '../../shared/constants';

import * as validation from './model/validation';
import { passwordRules } from './model/validation';
import { AddressesTable } from './ui/table';

import './ui/_page.scss';

export function ProfilePage() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);

  const [activeTab, setActiveTab] = useState('general');
  const [isEdit, setIsEdit] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (!tokenObject) {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate]);

  const setUserDataToForm = useCallback(() => {
    if (session?.userData.email) {
      const { email, firstName, lastName, dateOfBirth } = session.userData;
      form.setFieldsValue({
        email,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? dayjs(dateOfBirth, 'YYYY-MM-DD') : null,
        dateOfBirthDisabled: dateOfBirth,
      });
    }
  }, [form, session?.userData]);

  useLayoutEffect(() => {
    setUserDataToForm();
  }, [setUserDataToForm]);

  const handleSaveChanges = () => {
    const { email, firstName, lastName, dateOfBirth } = form.getFieldsValue();
    const date = dateOfBirth.format('YYYY-MM-DD');

    const updatedCustomer: UpdateCustomerDraft = {
      email,
      firstName,
      lastName,
      dateOfBirth: date,
    };
    session
      ?.updateCustomerInfo(updatedCustomer)
      .then(() => setIsEdit(false))
      .then(() => message.success('Your data has been changed successfully!'))
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handlePasswordChange = () => {
    const { currentPassword, newPassword } = passwordForm.getFieldsValue();

    const { version } = session?.userData as Customer;

    session
      ?.updatePassword({ version, currentPassword, newPassword })
      .then(() => passwordForm.resetFields())
      .then(() => message.success('Your password has been changed successfully'))
      .catch((err) => message.error(err.message));
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleEditMode = () => {
    if (isEdit) {
      setUserDataToForm();
    }
    setIsEdit((edit) => !edit);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="profile">
      <div className="profile-title">
        {activeTab === 'general' && (
          <div className="general-info">
            <span className="general-title">PROFILE</span>
            <Button shape="circle" type="text" onClick={handleEditMode}>
              {isEdit ? <CloseOutlined /> : <EditOutlined />}
            </Button>
          </div>
        )}
        {activeTab === 'addresses' && (
          <div className="general-info">
            <div className="addresses-title">ADDRESSES</div>
            <Button shape="circle" type="text" onClick={openAddModal}>
              <PlusOutlined />
            </Button>
          </div>
        )}
        {activeTab === 'password' && (
          <div className="general-info">
            <div className="addresses-title">PASSWORD</div>
          </div>
        )}
      </div>
      <Tabs
        className="profile-tabs"
        tabPosition="top"
        activeKey={activeTab}
        onChange={onTabChange}
        items={[
          {
            label: 'General',
            key: 'general',
            children: (
              <div className="general-container">
                <Form
                  layout="horizontal"
                  form={form}
                  onFinish={handleSaveChanges}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 24 }}
                  className="general-form"
                  autoComplete="off"
                >
                  <div className="profile-content general">
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={isEdit ? validation.emailRules : validation.textRulesDisabled('disabled')}
                      validateFirst
                      hasFeedback={isEdit}
                    >
                      <Input placeholder={session?.userData?.email || ''} className="full-width" disabled={!isEdit} />
                    </Form.Item>
                    <Form.Item
                      name="firstName"
                      label="First name:"
                      rules={isEdit ? validation.textRules('First name') : validation.textRulesDisabled('disabled')}
                      validateFirst
                      hasFeedback={isEdit}
                    >
                      <Input
                        placeholder={session?.userData?.firstName || ''}
                        className="full-width"
                        disabled={!isEdit}
                      />
                    </Form.Item>
                    <Form.Item
                      name="lastName"
                      label="Last name:"
                      rules={isEdit ? validation.textRules('Last name') : validation.textRulesDisabled('disabled')}
                      validateFirst
                      hasFeedback={isEdit}
                    >
                      <Input
                        placeholder={session?.userData?.lastName || ''}
                        className={`full-width ${!isEdit && 'disabled-input'}`}
                        disabled={!isEdit}
                      />
                    </Form.Item>
                    {isEdit ? (
                      <Form.Item name="dateOfBirth" label="Date of birth:" rules={validation.ageRules}>
                        <DatePicker
                          disabled={!isEdit}
                          placeholder={session?.userData?.dateOfBirth || ''}
                          className="full-width"
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item name="dateOfBirthDisabled" label="Date of birth" rules={validation.ageRulesDisabled}>
                        <Input
                          placeholder={session?.userData?.dateOfBirth || ''}
                          className="full-width"
                          disabled={!isEdit}
                        />
                      </Form.Item>
                    )}
                  </div>

                  {isEdit && (
                    <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
                      <Button type="primary" htmlType="submit" className="general-btn">
                        Save Changes
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </div>
            ),
          },
          {
            label: 'Addresses',
            key: 'addresses',
            children: <AddressesTable isAddModalOpen={isAddModalOpen} closeAddModal={closeAddModal} />,
          },
          {
            label: 'Password change',
            key: 'password',
            children: (
              <Form
                form={passwordForm}
                labelCol={{ span: 8 }}
                wrapperCol={{ offset: 0, span: 24 }}
                className="password-form"
                autoComplete="off"
                onFinish={handlePasswordChange}
                layout="horizontal"
              >
                <div className="password-content">
                  <Form.Item
                    name="currentPassword"
                    label="Current password"
                    rules={passwordRules}
                    validateFirst
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item name="newPassword" label="New password" rules={passwordRules} validateFirst hasFeedback>
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8 }} className="password-footer">
                    <Button className="password-btn" type="primary" htmlType="submit">
                      Change
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            ),
          },
        ]}
      />
    </div>
  );
}
