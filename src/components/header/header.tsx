import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import logo from './ui/LIDILU.png';
import sprite from './ui/sprites.svg';

import './ui/_header.scss';

export const Header = () => {
  const { session } = useContext(sessionContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  const handleRegistration = () => {
    navigate(ROUTES.REGISTRATION);
  };

  const handleUser = () => {
    navigate(ROUTES.PROFILE);
  };

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
            <>
              <Button className="header-btn-user" type="link" onClick={handleUser}>
                <svg className="header-user-ico">
                  <use xlinkHref={`${sprite}#user`} />
                </svg>
              </Button>
              <Button className="header-btn" type="link" icon={<LogoutOutlined />} onClick={() => session?.logout()}>
                LOG OUT
              </Button>
            </>
          ) : (
            <Button className="header-btn" type="link" icon={<LoginOutlined />} onClick={handleLogin}>
              SIGN IN
            </Button>
          )}
          {!session?.isLogin && (
            <Button className="header-btn" type="link" icon={<UserOutlined />} onClick={handleRegistration}>
              SIGN UP
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
          <li>
            <Link className="header-menu-item" to={`${ROUTES.PRODUCT}/375`}>
              Product
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
