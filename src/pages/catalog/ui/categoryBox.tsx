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

  const handleClick = () => {
    onCategoryClick();
  };

  return (
    <button type="button" className={`category ${isActive ? 'active' : ''}`} onClick={handleClick}>
      {name}
    </button>
  );
};
