import { createBrowserRouter } from 'react-router-dom';

import { Main } from '../pages/main/page';
import { LoginPage } from '../pages/login/page';
import { RegistrationPage } from '../pages/registration/page';
import { CatalogPage } from '../pages/catalog/page';
import { ProductPage } from '../pages/product/page';
import { ProfilePage } from '../pages/profile/page';
import { BasketPage } from '../pages/basket/page';
import { AboutPage } from '../pages/about/page';
import { ROUTES } from '../shared/constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Main/>,
    errorElement: <h1>404</h1>
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage/>
  },
  {
    path: ROUTES.REGISTRATION,
    element: <RegistrationPage/>
  },
  {
    path: ROUTES.CATALOG,
    element: <CatalogPage/>
  },
  {
    path: ROUTES.PRODUCT,
    element: <ProductPage/>
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage/>
  },
  {
    path: ROUTES.BASKET,
    element: <BasketPage/>
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutPage/>
  }
]);