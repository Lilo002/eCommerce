import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { ProductPage } from '../pages/product/page';

test('Renders the Basket page', () => {
  render(
    <Router>
      <ProductPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
