import { Link } from 'react-router-dom';
import { Product } from '@commercetools/platform-sdk';

import { CURRENCY_CODE, ROUTES } from '../../../shared/constants';

const getShortText = (text: string | undefined, maxLength: number) => {
  if (!text) {
    return '...';
  }

  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

const formatPrices = (prices: number | undefined, fractionDigits: number | undefined) => {
  if (prices && fractionDigits) {
    return (prices / 10 ** fractionDigits).toFixed(fractionDigits).replace('.', ',');
  }

  return 0;
};

export const ProductCard = ({ product }: { product: Product }) => {
  const productId = product.id;
  const maxLengthName = 23;
  const name = getShortText(product?.masterData?.current?.name?.['en-GB'], maxLengthName);
  const maxLengthDescription = 145;
  const description = getShortText(product?.masterData?.current?.description?.['en-GB'], maxLengthDescription);
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
