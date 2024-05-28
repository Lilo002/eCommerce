import { SetStateAction, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Button, Checkbox, CheckboxProps, Slider } from 'antd';

import { CURRENCY_CODE } from '../../../shared/constants';
import { PRICE_RANGE } from '../model/constants';

import sprites from './icon/sprites.svg';
import { CategoryBox } from './categoryBox';

export const Filters = ({
  categories,
  onSetFilters,
  onClearFilters,
}: {
  categories: Category[];
  onSetFilters: (categoriesIds: string[], productsWithDiscount: boolean, priceRange: number[]) => void;
  onClearFilters: () => void;
}) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [productsWithDiscount, setProductsWithDiscount] = useState(false);
  const [isVisibleFilters, setIsVisibleFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([PRICE_RANGE.MIN_PRICE, PRICE_RANGE.MAX_PRICE]);
  const [minPrice, maxPrice] = priceRange;

  const selectCategory = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((item) => item !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const setFilters = () => {
    onSetFilters(selectedCategoryIds, productsWithDiscount, priceRange);
  };

  const clearFilters = () => {
    setSelectedCategoryIds([]);
    setProductsWithDiscount(false);
    setPriceRange([PRICE_RANGE.MIN_PRICE, PRICE_RANGE.MAX_PRICE]);
    onClearFilters();
  };

  const changeProductsWithDiscount: CheckboxProps['onChange'] = (e) => {
    setProductsWithDiscount(e.target.checked);
  };

  const changeVisibilityStatusFilters = () => {
    setIsVisibleFilters(!isVisibleFilters);
  };

  const changePriceRange = (newPriceRange: SetStateAction<number[]>) => {
    setPriceRange(newPriceRange);
  };

  return (
    <>
      <div className="catalog-filters-header">
        <h2 className="catalog-filters-header-title">FILTERS</h2>
        <Button type="primary" onClick={changeVisibilityStatusFilters}>
          <svg className="icon">
            <use xlinkHref={`${sprites}${isVisibleFilters ? '#show' : '#hidden'}`} />
          </svg>
        </Button>
      </div>
      <div className={`catalog-filters-container ${isVisibleFilters ? 'show-filters' : ''}`}>
        <div className="catalog-categories">
          {categories.map((item) => (
            <CategoryBox
              key={item.id}
              category={item}
              onCategoryClick={() => selectCategory(item.id)}
              isActive={selectedCategoryIds.includes(item.id)}
            />
          ))}
        </div>
        <div className="catalog-filters-block-price">
          <p>
            Price range: {minPrice}
            {CURRENCY_CODE.USD} - {maxPrice}
            {CURRENCY_CODE.USD}
          </p>
          <div className="catalog-filters-block-price-slider">
            <Slider range value={priceRange} max={PRICE_RANGE.MAX_PRICE} onChange={changePriceRange} />
          </div>
        </div>
        <div className="catalog-filters-block-checkbox">
          <Checkbox checked={productsWithDiscount} onChange={changeProductsWithDiscount}>
            Show only at a discount
          </Checkbox>
        </div>
        <div className="catalog-filters-block-btn">
          <Button className="catalog-filters-btn" type="primary" onClick={setFilters}>
            Filter
          </Button>
          <Button className="catalog-filters-btn" type="primary" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};
