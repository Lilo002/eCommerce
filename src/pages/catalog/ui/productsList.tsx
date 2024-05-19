import { Product } from '@commercetools/platform-sdk';

import { ProductCard } from './productCard';

export const ProductsList = ({ products }: { products: Product[] }) => (
  <div className="catalog-cards">
    {products.map((item) => (
      <ProductCard key={item.id} product={item} />
    ))}
  </div>
);
