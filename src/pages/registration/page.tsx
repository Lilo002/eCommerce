import { Link } from 'react-router-dom';

import { ROUTES } from '../../shared/constants';

export function RegistrationPage() {
  return (
    <div>
      <h1>Registration page</h1>
      <button type="button">
        <Link to={ROUTES.MAIN}>to main</Link>
      </button>
      <button type="button">
        <Link to={ROUTES.LOGIN}>to login</Link>
      </button>
    </div>
  );
}
