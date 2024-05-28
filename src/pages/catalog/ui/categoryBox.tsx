import { Category } from '@commercetools/platform-sdk';

export const CategoryBox = ({
  category,
  onCategoryClick,
  isActive,
}: {
  category: Category;
  onCategoryClick: () => void;
  isActive: boolean;
}) => {
  const name = category?.name?.['en-GB'];

  return (
    <button type="button" className={`category ${isActive ? 'active' : ''}`} onClick={onCategoryClick}>
      {name}
    </button>
  );
};
