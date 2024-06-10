import { LineItem, TypedMoney } from '@commercetools/platform-sdk';

import { CURRENCY_CODE } from '../../../shared/constants';
import { CartWithDiscount } from '../model/interface';

export const getPrice = (price: TypedMoney | undefined, quantity: LineItem['quantity'] = 1): string => {
  if (!price) {
    return '';
  }
  const { centAmount, currencyCode, fractionDigits } = price;
  return `${((centAmount * quantity) / 100).toFixed(fractionDigits)} ${CURRENCY_CODE[currencyCode]}`;
};

export const ProductPrice = ({ product }: { product: LineItem }) => {
  const { totalPrice, discountedPricePerQuantity, price, quantity } = product;

  return (
    <div className="cart-price">
      <p className="cart-price-one card-price-current">{getPrice(totalPrice)}</p>
      {discountedPricePerQuantity[0] && (
        <p className="cart-price-one-old card-price-old">{getPrice(price.value, quantity)}</p>
      )}
    </div>
  );
};

export const TotalPrice = ({ cart }: { cart: CartWithDiscount }) => {
  const getTotalPrice = (price: number): string => {
    if (!price) {
      return '';
    }
    const { fractionDigits, currencyCode } = cart.totalPrice;

    return `${(price / 100).toFixed(fractionDigits)} ${currencyCode}`;
  };

  return (
    <div className="cart-price-total">
      <p className="cart-price-total-description">Total price:</p>

      <p className="cart-price-total-current card-price-current">{getTotalPrice(cart?.totalPrice.centAmount)}</p>
      {cart.discountCodes?.length > 0 && cart.discountOnTotalPrice && (
        <p className="cart-price-total-old card-price-old">
          {getTotalPrice(cart.totalPrice.centAmount + cart.discountOnTotalPrice.discountedAmount.centAmount)}
        </p>
      )}
    </div>
  );
};
