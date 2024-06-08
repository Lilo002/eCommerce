import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductProjection } from '@commercetools/platform-sdk';
import { Button, message } from 'antd';

import { sessionContext } from '../../../context/sessionContext';
import { CURRENCY_CODE, ROUTES } from '../../../shared/constants';
import { checkProductInCart } from '../../product/model/data';
import { formatPrices } from '../lib/formatPrices';
import { getShortText } from '../lib/getShortText';
import { DEFAULT_QUANTITY_PRODUCTS, MAX_LENGTH_DESCRIPTION, MAX_LENGTH_NAME } from '../model/constants';

import sprites from './icon/sprites.svg';

export const ProductCard = ({ product }: { product: ProductProjection }) => {
  const productKey = product.key;
  const productId = product.id;
  const name = getShortText(product?.name?.['en-GB'], MAX_LENGTH_NAME);
  const description = getShortText(product?.masterVariant.attributes?.[0].value, MAX_LENGTH_DESCRIPTION);
  const imgUrl = product?.masterVariant?.attributes?.[6].value;
  const priceValue = product?.masterVariant?.prices?.[0]?.value;
  const isDiscountedExists = !!product?.masterVariant?.prices?.[0]?.discounted;
  const discountedValue = product?.masterVariant?.prices?.[0]?.discounted?.value;
  const currencyCode = priceValue?.currencyCode ? CURRENCY_CODE[priceValue?.currencyCode] : '';

  const price = formatPrices(priceValue?.centAmount, priceValue?.fractionDigits);
  const discounted = formatPrices(discountedValue?.centAmount, discountedValue?.fractionDigits);

  const { session } = useContext(sessionContext);
  const isProductInCurrentCart = checkProductInCart(session?.cart, productKey || '');
  const [isProductInCart, setIsProductInCart] = useState(isProductInCurrentCart);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);

  const addProductToCart = () => {
    setIsLoaderActive(true);
    session
      ?.addProductToCard(productId, DEFAULT_QUANTITY_PRODUCTS)
      .then(() => {
        setIsLoaderActive(false);
        setIsProductInCart(true);
        message.success('Product added successfully');
      })
      .catch((err) => {
        setIsLoaderActive(false);
        message.error(err.message);
      });
  };

  return (
    <Link to={`${ROUTES.PRODUCT}/${productKey}`}>
      <div className="card">
        <img className="card-img" alt="example" src={imgUrl} />
        <div className="card-body">
          <p className="card-title">{name}</p>
          <p className="card-description">{description} </p>
          <div className="card-footer">
            <div className="card-price">
              {isDiscountedExists && <p className="card-price-current">{discounted + currencyCode}</p>}

              <p className={`${isDiscountedExists ? 'card-price-old' : 'card-price-current'}`}>
                {price + currencyCode}
              </p>
            </div>
            <Button
              className="catalog-filters-btn"
              type="primary"
              shape="circle"
              onClick={(event) => {
                event.preventDefault();
                addProductToCart();
              }}
              disabled={isProductInCart}
            >
              {!isLoaderActive ? (
                <svg className="icon">
                  <use xlinkHref={`${sprites}#add`} />
                </svg>
              ) : (
                <svg className="icon loader">
                  <use xlinkHref={`${sprites}#loader`} />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
