import { Cart, LineItem, Price, TypedMoney } from '@commercetools/platform-sdk';

import { CURRENCY_CODE } from '../../../shared/constants';

export const getPrice = (price: TypedMoney | undefined, quantity: LineItem['quantity'] = 1): string => {
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
    <p className="cart-price-one card-price-current">
      {isDiscounted ? getPrice(price?.discounted?.value, quantity) : getPrice(price?.value, quantity)}
    </p>
  </div>
);

export const TotalPrice = ({ totalPrice }: { totalPrice: Cart['totalPrice'] }) => {
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

      <p className="cart-price-total-current card-price-current">{getTotalPrice(totalPrice.centAmount)}</p>
    </div>
  );
};
