import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductData } from '@commercetools/platform-sdk';
import { Breadcrumb, Button, message, Spin } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ROUTES } from '../../shared/constants';

import { checkProductInCart } from './model/data';
import { ProductDetails } from './ui/productDetails';
import { ProductPrice } from './ui/productPrice';
import { ProductImage } from './ui/slider/slider';

import './ui/_product.scss';

export const ProductPage = () => {
  const { productKey } = useParams();
  const navigate = useNavigate();
  const { session } = useContext(sessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductData | null>(null);
  const [productId, setProductId] = useState<string>('');
  const isProductInCurrentCart = checkProductInCart(session?.cart, productKey || '');
  const [isProductInCart, setIsProductInCart] = useState(isProductInCurrentCart);

  useEffect(() => {
    session
      ?.getProduct(productKey || '')
      .then((res) => {
        setProductId(res.id);
        setData(res.masterData.current);
        setIsProductInCart(isProductInCurrentCart);
        setIsLoading(false);
      })
      .catch(() => navigate(ROUTES.NOT_FOUND));
  }, [navigate, productKey, isProductInCurrentCart, session]);

  if (!data) {
    return <Spin size="large" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const showMessage = (text: string) => {
    message.success(text);
  };

  const showErrorMessage = (text: string) => {
    message.error(text);
  };

  const addProductToCart = () => {
    session
      ?.addProductToCard(productId, 1)
      .then(() => {
        setIsProductInCart(true);
        showMessage('This product has been successfully added to your cart');
      })
      .catch((error: Error) => showErrorMessage(error.message));
  };

  const removeProductFromCart = () => {
    session
      ?.decreaseProductQuantity(productId, 1)
      .then(() => {
        setIsProductInCart(false);
        showMessage('This product has been successfully removed from your cart');
      })
      .catch((error: Error) => showErrorMessage(error.message));
  };

  const { name, masterVariant, description } = data;
  const images = data.masterVariant?.images;
  const price = masterVariant?.prices?.[0];
  const isDiscounted = !!data.masterVariant?.prices?.[0]?.discounted;
  const attributes = masterVariant?.attributes || [];

  return (
    <article className="product-inner">
      {images && <ProductImage images={images} />}
      <div className="product">
        <Breadcrumb
          className="breadcrumb"
          separator=">"
          items={[
            {
              title: 'Home',
              href: ROUTES.MAIN,
            },
            {
              title: 'Catalog',
              href: ROUTES.CATALOG,
            },
            {
              title: name['en-GB'],
            },
          ]}
        />
        <h2 className="product-title">{name['en-GB']}</h2>
        <ProductPrice price={price} isDiscounted={isDiscounted} />
        <div className="product-cart">
          <Button type="primary" className="product-cart-btn" onClick={addProductToCart} disabled={isProductInCart}>
            <span className="product-cart-content">Add to Cart</span>
          </Button>
          <Button
            type="primary"
            className="product-cart-btn"
            onClick={removeProductFromCart}
            disabled={!isProductInCart}
          >
            <span className="product-cart-content">Remove from Cart</span>
          </Button>
        </div>
        <div className="product-info">
          <div className="product-info-title">
            <h3 className="product-info-title-content">Description</h3>
          </div>
          <p>{description?.['en-GB']}</p>
          <div className="product-info-title">
            <h3 className="product-info-title-content">Details</h3>
          </div>
          <ProductDetails attributes={attributes} />
        </div>
      </div>
    </article>
  );
};
