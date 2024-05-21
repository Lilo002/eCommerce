import { Link } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';

import { CURRENCY_CODE, ROUTES } from '../../../shared/constants';
import { formatPrices } from '../lib/formatPrices';
import { getShortText } from '../lib/getShortText';
import { MAX_LENGTH_DESCRIPTION, MAX_LENGTH_NAME } from '../model/constants';

export const ProductCard = ({ product }: { product: Product }) => {
  const productId = product.key;
  const name = getShortText(product?.masterData?.current?.name?.['en-GB'], MAX_LENGTH_NAME);
  const description = getShortText(product?.masterData?.current?.description?.['en-GB'], MAX_LENGTH_DESCRIPTION);
  const imgUrl = product?.masterData?.current?.masterVariant?.images?.[0]?.url;
  const priceValue = product?.masterData?.current?.masterVariant?.prices?.[0]?.value;
  const isDiscountedExists = !!product?.masterData?.current?.masterVariant?.prices?.[0]?.discounted;
  const discountedValue = product?.masterData?.current?.masterVariant?.prices?.[0]?.discounted?.value;
  const currencyCode = priceValue?.currencyCode ? CURRENCY_CODE[priceValue?.currencyCode] : '';

  const price = formatPrices(priceValue?.centAmount, priceValue?.fractionDigits);
  const discounted = formatPrices(discountedValue?.centAmount, discountedValue?.fractionDigits);

  return (
    <Link to={`${ROUTES.PRODUCT}/${productId}`}>
      <div className="card">
        <img className="card-img" alt="example" src={imgUrl} />
        <div className="card-body">
          <p className="card-title">{name}</p>
          <p className="card-description">{description} </p>
          <div className="card-price">
            {isDiscountedExists && <p className="card-price-current">{discounted + currencyCode}</p>}

            <p className={`${isDiscountedExists ? 'card-price-old' : 'card-price-current'}`}>{price + currencyCode}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
