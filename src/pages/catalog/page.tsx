import { useContext, useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';

import { sessionContext } from '../../context/sessionContext';

import { ProductsList } from './ui/productsList';

import './ui/_catalog.scss';

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { session } = useContext(sessionContext);

  useEffect(() => {
    session?.getAllProducts().then((item) => {
      setProducts(item);
    });
  }, [session]);

  return (
    <div className="catalog">
      <h2>This will be our catalog page</h2>
      <ProductsList products={products} />
    </div>
  );
}
