import { Cart } from '@commercetools/platform-sdk';

export interface CartWithDiscount extends Cart {
  discountOnTotalPrice?: DiscountOnTotalPrice;
}

interface DiscountOnTotalPrice {
  discountedAmount: {
    centAmount: number;
  };
}
