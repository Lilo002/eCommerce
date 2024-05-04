import './_header.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/constants';
import { sessionContext } from '../../context/sessionContext';
import { useContext } from 'react';

export const Header = () => {
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
      <div className="header-menu-btn">
        {session?.isLogin ? (
          <button onClick={() => session?.logout()}>
            <Link to={ROUTES.LOGIN}>Log out</Link>
          </button>
        ) : (
          <button>
            <Link to={ROUTES.LOGIN}>Log in</Link>
          </button>
        )}
        <button>
          <Link to={ROUTES.REGISTRATION}>Registration</Link>
        </button>
      </div>
    </header>
  );
};
