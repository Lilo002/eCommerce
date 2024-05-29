import { Breadcrumb } from 'antd';

import { ROUTES } from '../../../shared/constants';

export const BreadcrumbCatalog = ({ userCategories }: { userCategories: string }) => (
  <Breadcrumb
    className="breadcrumb"
    separator=">"
    items={
      userCategories
        ? [
            {
              title: 'Home',
              href: ROUTES.MAIN,
            },
            {
              title: 'Catalog',
              href: ROUTES.CATALOG,
            },
            { title: userCategories },
          ]
        : [
            {
              title: 'Home',
              href: ROUTES.MAIN,
            },
            {
              title: 'Catalog',
            },
          ]
    }
  />
);
