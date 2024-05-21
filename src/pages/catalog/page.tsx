import { useContext, useEffect, useState } from 'react';
import { Product } from '@commercetools/platform-sdk';

import { sessionContext } from '../../context/sessionContext';

import { LIMIT_PRODUCT } from './model/constants';
import { ProductsList } from './ui/productsList';

import './ui/_catalog.scss';

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { session } = useContext(sessionContext);

  useEffect(() => {
    session?.getAllProducts(LIMIT_PRODUCT).then((items) => {
      setProducts(items);
    });
  }, [session]);

  return (
    <div className="catalog">
      <ProductsList products={products} />
    </div>
  );
}
