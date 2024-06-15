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

    return `${(price / 100).toFixed(fractionDigits)} ${CURRENCY_CODE[currencyCode]}`;
  };

  const calculateTotalDiscount = (products: CartWithDiscount['lineItems']) => {
    if (cart.discountOnTotalPrice) return cart.discountOnTotalPrice.discountedAmount.centAmount;
    const totalDiscount = products.reduce((discount, product) => {
      if (product.discountedPricePerQuantity[0]) {
        return discount + product.price.value.centAmount * product.quantity - product.totalPrice.centAmount;
      }
      return discount;
    }, 0);
    return totalDiscount;
  };

  return (
    <div className="cart-price-total-container cart-discount">
      {cart.discountCodes?.length > 0 && (calculateTotalDiscount(cart.lineItems) > 0 || cart.discountOnTotalPrice) && (
        <div className="cart-price-total cart-discount">
          <p className="cart-price-total-description cart-subtotal">Subtotal:</p>
          <p className="card-price-old">
            {cart.discountOnTotalPrice
              ? getTotalPrice(cart.totalPrice.centAmount + cart.discountOnTotalPrice.discountedAmount.centAmount)
              : getTotalPrice(cart.totalPrice.centAmount + calculateTotalDiscount(cart.lineItems))}
          </p>
        </div>
      )}
      {cart.discountCodes?.length > 0 && calculateTotalDiscount(cart.lineItems) > 0 && (
        <div className="cart-price-total cart-discount">
          <p className="cart-price-total-description cart-discount">Discount:</p>
          <p>{getTotalPrice(calculateTotalDiscount(cart.lineItems))}</p>
        </div>
      )}
      <div className="cart-price-total cart-discount">
        <p className="cart-price-total-description">Total:</p>

        <p className="cart-price-total-current card-price-current">{getTotalPrice(cart?.totalPrice.centAmount)}</p>
      </div>
    </div>
  );
};
