import { Price } from '@commercetools/platform-sdk';

import { getPrice } from '../model/data';

export const ProductPrice = ({ price, isDiscounted }: { price: Price | undefined; isDiscounted: boolean }) => (
  <div className="product-price">
    {isDiscounted && <p className="product-price-current">{getPrice(price?.discounted?.value)}</p>}
    <p className={isDiscounted ? 'product-price-old' : 'product-price-current'}>{getPrice(price?.value)}</p>
  </div>
);
