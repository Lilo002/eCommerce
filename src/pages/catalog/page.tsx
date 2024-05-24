import { useContext, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';

import { sessionContext } from '../../context/sessionContext';
import { ParamsRequestProducts } from '../../sdk/api';

import { LIMIT_PRODUCT, SORT_FIELDS, STAGED_PRODUCT } from './model/constants';
import { ProductsList } from './ui/productsList';
import { SearchBar } from './ui/searchBar';
import { SortBar } from './ui/sortBar';

import './ui/_catalog.scss';

const defaultParamsRequest: ParamsRequestProducts = {
  limit: LIMIT_PRODUCT,
  staged: STAGED_PRODUCT,
  sort: '',
};

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];

export function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { session } = useContext(sessionContext);

  useEffect(() => {
    session?.getAllProducts(defaultParamsRequest).then((items) => {
      setProducts(items);
    });
  }, [session]);

  const handleSearch = (searchTerm: string) => {
    session?.findProduct(searchTerm).then((items) => {
      setProducts(items);
    });
  };

  const handleSort = (sortField: SortField, sortDirection: string | null) => {
    let sortParam = '';
    if (sortDirection) {
      if (sortField === SORT_FIELDS.NAME) {
        sortParam = `name.en-GB ${sortDirection}`;
      } else if (sortField === SORT_FIELDS.PRICE) {
        sortParam = `price ${sortDirection}`;
      }
    }

    const paramsRequest: ParamsRequestProducts = {
      limit: LIMIT_PRODUCT,
      staged: STAGED_PRODUCT,
      sort: sortParam,
    };

    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
    });
  };

  return (
    <div className="catalo-page">
      <div className="catalog-filters" />
      <div className="catalog-main">
        <div className="catalog-control-panel">
          <SortBar onSort={handleSort} />
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="catalog">
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}
