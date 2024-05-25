import { useContext, useEffect, useState } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

import { sessionContext } from '../../context/sessionContext';
import { ParamsRequestCategories, ParamsRequestProducts } from '../../sdk/api';

import { LIMIT_CATEGORY, LIMIT_PRODUCT, SORT_FIELDS, STAGED_PRODUCT } from './model/constants';
import { Filters } from './ui/filters';
import { ProductsList } from './ui/productsList';
import { SearchBar } from './ui/searchBar';
import { SortBar } from './ui/sortBar';

import './ui/_catalog.scss';

const paramsRequest: ParamsRequestProducts = {
  limit: LIMIT_PRODUCT,
  staged: STAGED_PRODUCT,
  sort: '',
  filter: '',
};

const defaultParamsGetCategories: ParamsRequestCategories = {
  limit: LIMIT_CATEGORY,
};

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];

export function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { session } = useContext(sessionContext);

  useEffect(() => {
    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
    });

    session?.getAllCategories(defaultParamsGetCategories).then((items) => {
      setCategories(items);
    });
  }, [session]);

  const handleSearch = (searchTerm: string) => {
    session?.findProduct(searchTerm).then((items) => {
      setProducts(items);
    });
  };

  const handleSort = (sortField: SortField, sortDirection: string | null) => {
    if (sortDirection) {
      if (sortField === SORT_FIELDS.NAME) {
        paramsRequest.sort = `name.en-GB ${sortDirection}`;
      } else if (sortField === SORT_FIELDS.PRICE) {
        paramsRequest.sort = `price ${sortDirection}`;
      }
    } else {
      paramsRequest.sort = '';
    }

    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
    });
  };

  const handleSetFilters = (categoriesIds: string[]) => {
    const minLength = 1;

    if (categoriesIds.length >= minLength) {
      const filter = categoriesIds.map((id) => `subtree("${id}")`).join(', ');
      paramsRequest.filter = `categories.id: ${filter}`;
    }

    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
    });
  };

  const handleClearFilters = () => {
    if (paramsRequest.filter) {
      paramsRequest.filter = '';

      session?.getAllProducts(paramsRequest).then((items) => {
        setProducts(items);
      });
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-filters">
        <Filters categories={categories} onSetFilters={handleSetFilters} onClearFilters={handleClearFilters} />
      </div>
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
