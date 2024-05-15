import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { ROUTES } from '../../shared/constants';

import './ui/_main.scss';

export function Main() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleRegistration = () => {
    navigate(ROUTES.REGISTRATION);
  };

  return (
    <div className="main">
      <Button className="main-btn" type="link" onClick={handleLogin}>
        LOG IN
      </Button>
      <Button className="main-btn" type="link" onClick={handleRegistration}>
        SIGN IN
      </Button>
    </div>
  );
}
