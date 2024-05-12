import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import logo from './ui/LIDILU.png';

import './ui/_header.scss';

export const Header = () => {
  const { session } = useContext(sessionContext);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-inner-logo">
          <Link to={ROUTES.MAIN}>
            <img src={logo} alt="Lidilu logo" />
          </Link>
        </div>
        <div className="header-inner-user">
          {session?.isLogin ? (
            <Button className="header-btn" type="link" icon={<LogoutOutlined />} onClick={() => session?.logout()}>
              Log out
            </Button>
          ) : (
            <Button className="header-btn" type="link" icon={<LoginOutlined />}>
              <Link to={ROUTES.LOGIN}>LOG IN</Link>
            </Button>
          )}
          {!session?.isLogin && (
            <Button className="header-btn" type="link" icon={<UserOutlined />}>
              <Link to={ROUTES.REGISTRATION}>SIGN IN</Link>
            </Button>
          )}
        </div>
      </div>

      <nav className="header-menu">
        <ul className="header-menu-list">
          <li>
            <Link className="header-menu-item" to={ROUTES.MAIN}>
              MAIN
            </Link>
          </li>
          <li>
            <Link className="header-menu-item" to={ROUTES.CATALOG}>
              CATALOG
            </Link>
          </li>
          <li>
            <Link className="header-menu-item" to={ROUTES.ABOUT}>
              ABOUT US
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
