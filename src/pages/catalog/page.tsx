import { useContext, useEffect, useState } from 'react';
import { Category, ProductProjection } from '@commercetools/platform-sdk';

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
import { Filters } from './ui/filters';
import { ProductsList } from './ui/productsList';
import { SearchBar } from './ui/searchBar';
import { SortBar } from './ui/sortBar';

import './ui/_catalog.scss';

const paramsRequest: ParamsRequestProducts = {
  limit: LIMIT_PRODUCT,
  staged: STAGED_PRODUCT,
  sort: null,
  filter: [],
  priceCurrency: null,
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

  const searchProduct = (searchTerm: string) => {
    session?.findProduct(searchTerm).then((items) => {
      setProducts(items);
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

    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
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
    }

    if (productsWithDiscount) {
      paramsRequest.priceCurrency = PRICE_CURRENCY.USD;
      paramsRequest.filter.push(`variants.scopedPriceDiscounted:${productsWithDiscount}`);
    }

    paramsRequest.filter.push(
      `variants.price.centAmount: range(${minPrice * FRACTION_DIGITS} to ${maxPrice * FRACTION_DIGITS})`,
    );

    session?.getAllProducts(paramsRequest).then((items) => {
      setProducts(items);
    });
  };

  const clearFilters = () => {
    if (paramsRequest.filter) {
      paramsRequest.filter = [];
      paramsRequest.priceCurrency = '';

      session?.getAllProducts(paramsRequest).then((items) => {
        setProducts(items);
      });
    }
  };

  return (
    <div className="catalog-page">
      <div className="catalog-filters">
        <Filters categories={categories} onSetFilters={setFilters} onClearFilters={clearFilters} />
      </div>
      <div className="catalog-main">
        <div className="catalog-control-panel">
          <SortBar onSort={sortProduct} />
          <SearchBar onSearch={searchProduct} />
        </div>
        <div className="catalog">
          <ProductsList products={products} />
        </div>
      </div>
    </div>
  );
}
