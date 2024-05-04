import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

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

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    session?.login({ email, password });
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
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}
