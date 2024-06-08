import { Cart, LineItem, Price, TypedMoney } from '@commercetools/platform-sdk';

import { CURRENCY_CODE } from '../../../shared/constants';

export const getPrice = (price: TypedMoney | undefined, quantity: LineItem['quantity']): string => {
  if (!price) {
    return '';
  }
  const { centAmount, currencyCode, fractionDigits } = price;
  return `${((centAmount * quantity) / 100).toFixed(fractionDigits)} ${CURRENCY_CODE[currencyCode]}`;
};

export const ProductPrice = ({
  price,
  isDiscounted,
  quantity,
}: {
  price: Price | undefined;
  isDiscounted: boolean;
  quantity: LineItem['quantity'];
}) => (
  <div className="cart-price">
    {isDiscounted && (
      <p className="cart-price-current card-price-current">{getPrice(price?.discounted?.value, quantity)}</p>
    )}
    <p className={isDiscounted ? 'cart-price-old card-price-old' : 'cart-price-current card-price-current'}>
      {getPrice(price?.value, quantity)}
    </p>
  </div>
);

export const TotalPrice = ({ products, totalPrice }: { products: LineItem[]; totalPrice: Cart['totalPrice'] }) => {
  const checkIsDiscounted = () => products.some(({ price }) => price.discounted);

  const sumProductsPrices = () =>
    products.reduce((total, product) => {
      const price = product.price.value.centAmount;
      const itemTotal = price * product.quantity;
      return total + itemTotal;
    }, 0);

  const getTotalPrice = (price: number): string => {
    if (!price) {
      return '';
    }
    const { fractionDigits, currencyCode } = totalPrice;

    return `${(price / 100).toFixed(fractionDigits)} ${currencyCode}`;
  };

  return (
    <div className="cart-price-total">
      <p className="cart-price-total-description">Total price:</p>
      {checkIsDiscounted() && (
        <p className="cart-price-total-current card-price-current">{getTotalPrice(totalPrice.centAmount)}</p>
      )}
      <p
        className={
          checkIsDiscounted() ? 'cart-price-total-old card-price-old' : 'product-price-total-current card-price-current'
        }
      >
        {getTotalPrice(sumProductsPrices())}
      </p>
    </div>
  );
};
