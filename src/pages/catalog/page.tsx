import { useContext, useEffect, useState } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { Pagination } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ParamsRequestCategories, ParamsRequestProducts } from '../../sdk/api';

import {
  FRACTION_DIGITS,
  LIMIT_CATEGORY,
  LIMIT_PRODUCT,
  PRICE_CURRENCY,
  SORT_FIELDS,
  STAGED_PRODUCT,
} from './model/constants';
import { BreadcrumbCatalog } from './ui/breadcrumbCatalog';
import { Filters } from './ui/filters';
import { ProductsList } from './ui/productsList';
import { SearchBar } from './ui/searchBar';
import { SortBar } from './ui/sortBar';

import './ui/_catalog.scss';

const paramsRequest: ParamsRequestProducts = {
  limit: LIMIT_PRODUCT,
  staged: STAGED_PRODUCT,
};

const defaultParamsGetCategories: ParamsRequestCategories = {
  limit: LIMIT_CATEGORY,
};

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];

export function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userCategories, setUserCategories] = useState('');
  const { session } = useContext(sessionContext);

  useEffect(() => {
    session?.getAllProducts(paramsRequest).then((data) => {
      setProducts(data.results);
    });

    session?.getAllCategories(defaultParamsGetCategories).then((data) => {
      setCategories(data);
    });
  }, [session]);

  const searchProduct = (searchTerm: string) => {
    session?.findProduct(searchTerm).then((data) => {
      setProducts(data.results);
    });
  };

  const sortProduct = (sortField: SortField, sortDirection: string | null) => {
    if (sortDirection) {
      if (sortField === SORT_FIELDS.NAME) {
        paramsRequest.sort = `name.en-GB ${sortDirection}`;
      } else if (sortField === SORT_FIELDS.PRICE) {
        paramsRequest.sort = `price ${sortDirection}`;
      }
    } else {
      paramsRequest.sort = '';
    }

    session?.getAllProducts(paramsRequest).then((data) => {
      setProducts(data.results);
    });
  };

  const setFilters = (categoriesIds: string[], productsWithDiscount: boolean, priceRange: number[]) => {
    const minLength = 1;
    const [minPrice, maxPrice] = priceRange;
    paramsRequest.filter = [];
    paramsRequest.priceCurrency = '';

    if (categoriesIds.length >= minLength) {
      const filter = categoriesIds.map((id) => `subtree("${id}")`).join(', ');
      paramsRequest.filter.push(`categories.id: ${filter}`);
      const selectedCategories = categoriesIds
        .map((id) => categories.find((category) => category.id === id)?.name['en-GB'])
        .join(', ');
      setUserCategories(selectedCategories);
    }

    if (productsWithDiscount) {
      paramsRequest.priceCurrency = PRICE_CURRENCY.USD;
      paramsRequest.filter.push(`variants.scopedPriceDiscounted:${productsWithDiscount}`);
    }

    paramsRequest.filter.push(
      `variants.price.centAmount: range(${minPrice * FRACTION_DIGITS} to ${maxPrice * FRACTION_DIGITS})`,
    );

    session?.getAllProducts(paramsRequest).then((data) => {
      setProducts(data.results);
    });
  };

  const clearFilters = () => {
    if (paramsRequest.filter) {
      paramsRequest.filter = [];
      paramsRequest.priceCurrency = '';

      session?.getAllProducts(paramsRequest).then((data) => {
        setProducts(data.results);
      });
    }
    setUserCategories('');
  };

  return (
    <div className="catalog-page">
      <div className="catalog-filters">
        <Filters categories={categories} onSetFilters={setFilters} onClearFilters={clearFilters} />
      </div>
      <div className="catalog-main">
        <BreadcrumbCatalog userCategories={userCategories} />
        <div className="catalog-control-panel">
          <SortBar onSort={sortProduct} />
          <SearchBar onSearch={searchProduct} />
        </div>
        <div className="catalog">
          <ProductsList products={products} />
        </div>
        <Pagination className="pagination" current={1} total={50} defaultPageSize={8} />;
      </div>
    </div>
  );
}
