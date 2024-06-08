import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { LineItem, Product } from '@commercetools/platform-sdk';
import { Button, Image, InputNumber, List, message, Modal } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { getPrice, ProductPrice, TotalPrice } from './ui/productPrice';

import './ui/_page.scss';

export function BasketPage() {
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<LineItem[] | null>(session?.cart?.lineItems || null);

  useEffect(() => {
    setProducts(session?.cart?.lineItems || null);
  }, [session, session?.cart]);

  const removeItemFromCart = (id: Product['id']) => {
    session
      ?.updateProductQuantity(id, 0)
      .then(() => message.success('product deleted successfully'))
      .catch((err) => message.error(err.message));
  };

  const increaseItemCount = (id: Product['id']) => {
    session
      ?.addProductToCard(id, 1)
      .then(() => message.success('product added successfully'))
      .catch((err) => message.error(err.message));
  };

  const decreaseItemCount = (id: Product['id']) => {
    session
      ?.decreaseProductQuantity(id, 1)
      .then(() => message.success('product removed successfully'))
      .catch((err) => message.error(err.message));
  };

  const updateQuantity = (id: Product['id'], quantity: number) => {
    session
      ?.updateProductQuantity(id, quantity)
      .then(() => message.success('product removed successfully'))
      .catch((err) => message.error(err.message));
  };

  const navigateCatalog = () => navigate(ROUTES.CATALOG);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    session
      ?.deleteCart()
      .then(() => {
        setIsModalOpen(false);
        setProducts(null);
      })
      .catch((err) => message.error(err.message));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart">
      {products && session && products.length ? (
        <>
          <List
            dataSource={products}
            renderItem={(product) => (
              <List.Item key={product.productId}>
                {product.variant?.images?.[0] && <Image className="cart-image" src={product.variant.images[0].url} />}
                <span className="cart-name" style={{ marginLeft: 10 }}>
                  {product.name['en-GB']}
                </span>
                <ProductPrice
                  price={product.price}
                  quantity={product.quantity}
                  isDiscounted={!!product.price.discounted}
                />
                <div className="cart-info">
                  <div className="cart-buttons">
                    <Button
                      className="cart-button cart-button-increase"
                      onClick={() => decreaseItemCount(product.productId)}
                    >
                      -
                    </Button>
                    <InputNumber
                      className="cart-input-number"
                      min={1}
                      width={1}
                      value={product.quantity || 1}
                      onChange={(value) => updateQuantity(product.productId, value ?? 1)}
                    />
                    <Button
                      className="cart-button cart-button-decrease"
                      onClick={() => increaseItemCount(product.productId)}
                    >
                      +
                    </Button>
                  </div>
                  <p className="cart-price-sum">
                    {product.price.discounted
                      ? getPrice(product.price?.discounted?.value)
                      : getPrice(product.price?.value)}
                    / item
                  </p>
                </div>
                <Button className="cart-button" danger onClick={() => removeItemFromCart(product.productId)}>
                  <DeleteOutlined />
                </Button>
              </List.Item>
            )}
          />
          <TotalPrice totalPrice={session.cart.totalPrice} />
          <Button className="cart-reset" type="primary" htmlType="button" onClick={showModal}>
            Clear Shopping Cart
          </Button>
        </>
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
      <Modal centered title="Confirm Cart Clearing" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to clear the shopping cart?</p>
      </Modal>
    </div>
  );
}
