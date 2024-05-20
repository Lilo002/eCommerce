import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Tabs } from 'antd';
import dayjs from 'dayjs';

import { sessionContext } from '../../context/sessionContext';
import { getCookie } from '../../sdk/client/ClientBuilder';
import { ROUTES } from '../../shared/constants';

import * as validation from './model/validation';
import { AddressesTable } from './ui/table';

import './ui/_page.scss';

export function ProfilePage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);

  const [activeTab, setActiveTab] = useState('general');
  const [isEdit, setIsEdit] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (!tokenObject) {
      navigate(ROUTES.MAIN);
    }
  }, [navigate]);

  useLayoutEffect(() => {
    if (session?.userData) {
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

  const handleSaveChanges = () => {
    /* const data = form.getFieldsValue(); */
    setIsEdit(false);
  };

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleEditMode = () => {
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
        {activeTab === 'general' ? (
          <div className="general-info">
            <span className="general-title">PROFILE</span>
            <Button shape="circle" type="text" onClick={handleEditMode}>
              {isEdit ? <CloseOutlined /> : <EditOutlined />}
            </Button>
          </div>
        ) : (
          <div className="general-info">
            <div className="addresses-title">ADDRESSES</div>
            <Button shape="circle" type="text" onClick={openAddModal}>
              <PlusOutlined />
            </Button>
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
        ]}
      />
    </div>
  );
}
