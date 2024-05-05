import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import './_header.scss';

export const Header = ({ isMainPage = true }: { isMainPage: boolean }) => {
  const { session } = useContext(sessionContext);

  return (
    <header className="header">
      <div>
        <Link to={ROUTES.MAIN}>{session?.auth?.name}</Link>
      </div>
      <nav className="header-menu-list">
        <Link to={ROUTES.MAIN}>Main</Link>
        <Link to={ROUTES.CATALOG}>Catalog</Link>
        <Link to={ROUTES.ABOUT}>About Us</Link>
      </nav>
      {isMainPage ? (
        <div className="header-menu-btn">
          {session?.isLogin ? (
            <button type="button" onClick={() => session?.logout()}>
              Log out
            </button>
          ) : (
            <button type="button">
              <Link to={ROUTES.LOGIN}>Log in</Link>
            </button>
          )}
          <button type="button">
            <Link to={ROUTES.REGISTRATION}>Registration</Link>
          </button>
        </div>
      ) : (
        <div> </div>
      )}
    </header>
  );
};
