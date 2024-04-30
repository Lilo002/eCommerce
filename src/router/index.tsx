import { createBrowserRouter } from 'react-router-dom';

import { Main } from '../pages/main/page';
import { LoginPage } from '../pages/login/page';
import { RegistrationPage } from '../pages/registration/page';
import { CatalogPage } from '../pages/catalog/page';
import { ProductPage } from '../pages/product/page';
import { ProfilePage } from '../pages/profile/page';
import { BusketPage } from '../pages/basket/page';
import { AboutPage } from '../pages/about/page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main/>,
    errorElement: <h1>404</h1>
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/registration',
    element: <RegistrationPage/>
  },
  {
    path: '/catalog',
    element: <CatalogPage/>
  },
  {
    path: '/product',
    element: <ProductPage/>
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/busket',
    element: <BusketPage/>
  },
  {
    path: '/baout',
    element: <AboutPage/>
  }
]);