import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { CatalogPage } from '../pages/catalog/page';

test('Renders the Catalog page', () => {
  render(
    <Router>
      <CatalogPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
