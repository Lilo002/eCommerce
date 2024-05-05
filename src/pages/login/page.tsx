import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import './_page.scss';
import { Header } from '../../components/header/header';

const emailRules = [
  { required: true, message: 'Please input your email' },
  { pattern: /^[\w.]+@[\w.]+\.\w+$/, message: 'Invalid email format' },
  { pattern: /^\S+$/, message: 'Email must not contain leading or trailing whitespace' },
];

const passwordRules = [
  { required: true, message: 'Please input your password' },
  { min: 8, message: 'Password must be at least 8 characters' },
  {
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]?)[A-Za-z\d!@#$%^&*]+$/,
    message: 'Password must contain uppercase letters, lowercase letters, digits and special characters',
  },
  { pattern: /^\S+$/, message: 'Password must not contain leading or trailing whitespace' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { session } = useContext(sessionContext);

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
    session?.login({ email, password }).catch((error: Error) => {
      message.error(`Login error: ${error.message}`);
    });
    cleanInputs();
    if (session?.isLogin) {
      navigate(ROUTES.MAIN);
    }
  };

  return (
    <>
      <Header />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        className="login-form"
        onFinish={onFormSubmit}
        autoComplete="off"
      >
        <div className="login-info">
          <span className="login-title">Sign In</span>
          <Link to={ROUTES.REGISTRATION} className="login-registration">
            New to Lidilu? Create new account
          </Link>
        </div>
        <Form.Item name="email" label="Email" rules={emailRules} validateFirst hasFeedback>
          <Input value={email} onChange={(e) => onEmailChange(e.target.value)} />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} validateFirst hasFeedback>
          <Input.Password value={password} onChange={(e) => onPasswordChange(e.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
