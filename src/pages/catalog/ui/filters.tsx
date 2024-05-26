import { useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Button, Checkbox, CheckboxProps } from 'antd';

import { CategoryBox } from './categoryBox';

export const Filters = ({
  categories,
  onSetFilters,
  onClearFilters,
}: {
  categories: Category[];
  onSetFilters: (categoriesIds: string[], productsWithDiscount: boolean) => void;
  onClearFilters: () => void;
}) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [productsWithDiscount, setProductsWithDiscount] = useState(false);

  const handleCategoryClick = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((item) => item !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleClickFilterBtn = () => {
    onSetFilters(selectedCategoryIds, productsWithDiscount);
  };

  const handleClearFilterBtn = () => {
    setSelectedCategoryIds([]);
    setProductsWithDiscount(false);
    onClearFilters();
  };

  const changeProductsWithDiscount: CheckboxProps['onChange'] = (e) => {
    setProductsWithDiscount(e.target.checked);
  };

  return (
    <>
      <h2>Filters</h2>
      <div className="catalog-categories">
        {categories.map((item) => (
          <CategoryBox
            key={item.id}
            category={item}
            onCategoryClick={() => handleCategoryClick(item.id)}
            isActive={selectedCategoryIds.includes(item.id)}
          />
        ))}
      </div>
      <div className="catalog-filters-block-checkbox">
        <Checkbox checked={productsWithDiscount} onChange={changeProductsWithDiscount}>
          Show only at a discount
        </Checkbox>
      </div>
      <div className="catalog-filters-block-btn">
        <Button className="catalog-filters-btn" type="primary" onClick={handleClickFilterBtn}>
          Filter
        </Button>
        <Button className="catalog-filters-btn" type="primary" onClick={handleClearFilterBtn}>
          Clear
        </Button>
      </div>
    </>
  );
};
