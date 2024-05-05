import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import './UI/_notFound.scss';

export function NotFoundPage() {
  const { session } = useContext(sessionContext);

  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          session?.isLogin ? (
            <Button type="primary">
              <Link to={ROUTES.MAIN}>Back Main page</Link>
            </Button>
          ) : (
            <Button type="primary">
              <Link to={ROUTES.LOGIN}>Back Log in page</Link>
            </Button>
          )
        }
      />
    </div>
  );
}
