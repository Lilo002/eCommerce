import { useContext, useEffect, useState } from 'react';
import { Category, ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Pagination } from 'antd';

import { sessionContext } from '../../context/sessionContext';
import { ParamsRequestCategories, ParamsRequestProducts } from '../../sdk/api';

import {
  CURRENT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  FRACTION_DIGITS,
  LIMIT_CATEGORY,
  OFFSET_PRODUCT,
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
  limit: DEFAULT_PAGE_SIZE,
  staged: STAGED_PRODUCT,
  offset: OFFSET_PRODUCT,
};

const defaultParamsGetCategories: ParamsRequestCategories = {
  limit: LIMIT_CATEGORY,
};

type SortField = (typeof SORT_FIELDS)[keyof typeof SORT_FIELDS];

export function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userCategories, setUserCategories] = useState('');
  const [totalCountProduct, setTotalCountProduct] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(CURRENT_PAGE_NUMBER);
  const { session } = useContext(sessionContext);

  const dataProcessingGetAllProducts = (data: ProductProjectionPagedQueryResponse) => {
    const totalCountProducts = data.total;

    if (totalCountProducts) {
      setTotalCountProduct(totalCountProducts);
    }

    setProducts(data.results);
  };

  useEffect(() => {
    session?.getAllProducts(paramsRequest).then((data) => {
      dataProcessingGetAllProducts(data);
    });

    session?.getAllCategories(defaultParamsGetCategories).then((data) => {
      setCategories(data);
    });
  }, [session]);

  const searchProduct = (searchTerm: string) => {
    paramsRequest.offset = OFFSET_PRODUCT;

    session?.findProduct(searchTerm).then((data) => {
      setProducts(data.results);
    });

    setCurrentPageNumber(CURRENT_PAGE_NUMBER);
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
      dataProcessingGetAllProducts(data);
    });
  };

  const setFilters = (categoriesIds: string[], productsWithDiscount: boolean, priceRange: number[]) => {
    const minLength = 1;
    const [minPrice, maxPrice] = priceRange;
    paramsRequest.filter = [];
    paramsRequest.offset = OFFSET_PRODUCT;
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

    setCurrentPageNumber(CURRENT_PAGE_NUMBER);
    session?.getAllProducts(paramsRequest).then((data) => {
      dataProcessingGetAllProducts(data);
    });
  };

  const clearFilters = () => {
    if (paramsRequest.filter) {
      paramsRequest.filter = [];
      paramsRequest.priceCurrency = '';
      paramsRequest.offset = OFFSET_PRODUCT;

      session?.getAllProducts(paramsRequest).then((data) => {
        dataProcessingGetAllProducts(data);
      });
    }

    setCurrentPageNumber(CURRENT_PAGE_NUMBER);
    setUserCategories('');
  };

  const changePageNumber = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);

    paramsRequest.offset = DEFAULT_PAGE_SIZE * (pageNumber - 1);

    session?.getAllProducts(paramsRequest).then((data) => {
      dataProcessingGetAllProducts(data);
    });
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
        <Pagination
          className="pagination"
          current={currentPageNumber}
          total={totalCountProduct}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          onChange={changePageNumber}
        />
      </div>
    </div>
  );
}
