import { useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Button } from 'antd';

import { CategoryBox } from './categoryBox';

export const Filters = ({
  categories,
  onSetFilters,
  onClearFilters,
}: {
  categories: Category[];
  onSetFilters: (categoriesIds: string[]) => void;
  onClearFilters: () => void;
}) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const handleCategoryClick = (id: string) => {
    if (selectedCategoryIds.includes(id)) {
      setSelectedCategoryIds(selectedCategoryIds.filter((item) => item !== id));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, id]);
    }
  };

  const handleClickFilterBtn = () => {
    onSetFilters(selectedCategoryIds);
  };

  const handleClearFilterBtn = () => {
    setSelectedCategoryIds([]);
    onClearFilters();
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
