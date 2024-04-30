import { createBrowserRouter } from 'react-router-dom';

import { Main } from '../pages/main/page';
import { LoginPage } from '../pages/login/page';
import { RegistrationPage } from '../pages/registration/page';
import { Catalog } from '../pages/catalog/page';
import { Product } from '../pages/product/page';
import { Profile } from '../pages/profile/page';
import { Busket } from '../pages/basket/page';
import { About } from '../pages/about/page';

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
    element: <Catalog/>
  },
  {
    path: '/product',
    element: <Product/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/busket',
    element: <Busket/>
  },
  {
    path: '/baout',
    element: <About/>
  }
]);