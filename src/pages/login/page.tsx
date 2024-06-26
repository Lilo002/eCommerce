import { useContext, useLayoutEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

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

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const onFormSubmit = () => {
    session
      ?.login({ email, password })
      .then(() => {
        clearForm();
        navigate(ROUTES.MAIN);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ offset: 0, span: 24 }}
      className="login-form"
      onFinish={onFormSubmit}
      autoComplete="off"
      layout="vertical"
    >
      <div className="login-info">
        <span className="login-title">Sign In</span>
        <Link to={ROUTES.REGISTRATION} className="login-registration">
          <span className="login-subtitle">New to Lidilu? </span>
          Create new account
        </Link>
      </div>
      <div className="login-content">
        <Form.Item name="email" label="Email" rules={emailRules} validateFirst hasFeedback>
          <Input value={email} onChange={onEmailChange} />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} validateFirst hasFeedback>
          <Input.Password value={password} onChange={onPasswordChange} />
        </Form.Item>

        <Form.Item className="login-footer">
          <Button className="login-btn" type="primary" htmlType="submit">
            SIGN IN
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
