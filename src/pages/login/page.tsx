import { useContext, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

import { Header } from '../../components/header/header';
import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { emailRules, passwordRules } from './model';

import './_page.scss';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session } = useContext(sessionContext);

  useLayoutEffect(() => {
    if (session?.isLogin) {
      navigate(ROUTES.MAIN);
    }
  });

  const onEmailChange = (value: string) => {
    setEmail(value);
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
  };

  const cleanInputs = () => {
    setEmail('');
    setPassword('');
  };

  const onFormSubmit = () => {
    session
      ?.login({ email, password })
      .then(() => {
        cleanInputs();
        navigate(ROUTES.MAIN);
      })
      .catch((error: Error) => {
        message.error(`Login error: ${error.message}`);
      });
  };

  return (
    <>
      <Header />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ offset: 0, span: 24 }}
        className="login-form"
        onFinish={onFormSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <div className="login-info">
          <span className="login-title">Sign In</span>
          <Link to={ROUTES.REGISTRATION} className="login-registration">
            New to Lidilu? Create new account
          </Link>
        </div>
        <div className="login-content">
          <Form.Item name="email" label="Email" rules={emailRules} validateFirst hasFeedback>
            <Input value={email} onChange={(e) => onEmailChange(e.target.value)} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={passwordRules} validateFirst hasFeedback>
            <Input.Password
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" htmlType="submit">
              SIGN IN
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}
