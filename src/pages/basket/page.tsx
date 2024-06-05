import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import './ui/_page.scss';

export function BasketPage() {
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);

  /*   const checkIsCartEmpty= () => {
    session.cart
  } */

  const navigateCatalog = () => navigate(ROUTES.CATALOG);

  return (
    <div className="cart">
      {session?.cart && session.cart.lineItems ? (
        <div className="cart-empty">
          <div className="cart-empty-message">
            <h2 className="cart-title">
              Your shopping cart <ShoppingCartOutlined />
            </h2>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <h2 className="cart-title">
            Your shopping cart is empty <ShoppingCartOutlined />
          </h2>
          <div className="cart-description">
            <p>Looks like you haven&apos;t added any items to your cart yet...</p>
            <p>
              Start browsing our amazing products and find something you love! <HeartOutlined />
            </p>
          </div>
          <Button type="primary" htmlType="button" onClick={navigateCatalog}>
            Start Shopping Now
          </Button>
        </div>
      )}
    </div>
  );
}
