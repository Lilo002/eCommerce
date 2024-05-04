import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { ROUTES } from '../../shared/constants';

export const Main = () => {
  return (
    <div>
      <Header />
      <h1>Main page</h1>
      <button>
        <Link to={ROUTES.LOGIN}>to login</Link>
      </button>
      <button>
        <Link to={ROUTES.REGISTRATION}>to Registration</Link>
      </button>
    </div>
  );
};
