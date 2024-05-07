import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { ROUTES } from '../../shared/constants';

import './UI/_notFound.scss';

export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary">
            <Link to={ROUTES.MAIN}>Back Main page</Link>
          </Button>
        }
      />
    </div>
  );
}
