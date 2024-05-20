import { Product } from '@commercetools/platform-sdk';
import { Card } from 'antd';

const { Meta } = Card;

const getShortDescription = (description: string | undefined) => {
  if (!description) {
    return 'No description';
  }

  const maxLength = 145;
  if (description.length <= maxLength) {
    return description;
  }
  return `${description.slice(0, maxLength)}...`;
};

const formatPrices = (prices: number | undefined, fractionDigits: number | undefined) => {
  if (prices && fractionDigits) {
    return (prices / 10 ** fractionDigits).toFixed(fractionDigits).replace('.', ',');
  }

  return 0;
};

export const ProductCard = ({ product }: { product: Product }) => {
  const name = product?.masterData?.current?.name?.['en-GB'];
  const description = getShortDescription(product?.masterData?.current?.description?.['en-GB']);
  const imgUrl = product?.masterData?.current?.masterVariant?.images?.[0]?.url;
  const priceValue = product?.masterData?.current?.masterVariant?.prices?.[0]?.value;
  const isDiscountedExists = !!product?.masterData?.current?.masterVariant?.prices?.[0]?.discounted;
  const discountedValue = product?.masterData?.current?.masterVariant?.prices?.[0]?.value;

  const price = formatPrices(priceValue?.centAmount, priceValue?.fractionDigits);
  const discounted = formatPrices(discountedValue?.centAmount, discountedValue?.fractionDigits);

  return (
    <Card
      className="card"
      hoverable
      style={{
        width: 240,
      }}
      cover={<img className="card-img" alt="example" src={imgUrl} />}
    >
      <Meta title={name} description={description} />

      <div className="card-price">
        {isDiscountedExists && <p className="card-price-current">{discounted}</p>}

        <div className={`my-component ${isDiscountedExists ? 'card-price-old' : 'card-price-current'}`}>{price}</div>
      </div>
    </Card>
  );
};
