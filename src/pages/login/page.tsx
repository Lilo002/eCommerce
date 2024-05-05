import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { LoginCustomerDraft } from '../../sdk/api';
import { ROUTES } from '../../shared/constants';

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

  const onFormSubmit = (value: LoginCustomerDraft) => {
    session?.login(value);
    if (session?.isLogin) {
      navigate(ROUTES.MAIN);
    }
  };

  return (
    <div>
      <h1>Login page</h1>
      <button type="button">
        <Link to={ROUTES.MAIN}>to main</Link>
      </button>
      <button type="button">
        <Link to={ROUTES.REGISTRATION}>to Registration</Link>
      </button>
      <Form onFinish={onFormSubmit}>
        <Form.Item name="email" label="Email" rules={emailRules}>
          <Input value={email} onChange={(e) => onEmailChange(e.target.value)} />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules}>
          <Input.Password value={password} onChange={(e) => onPasswordChange(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
