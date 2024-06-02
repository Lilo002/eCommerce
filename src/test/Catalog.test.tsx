import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { CatalogPage } from '../pages/catalog/page';

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function matchMedia() {
      return {
        matches: false,
        addListener() {},
        removeListener() {},
      };
    };
});

test('Renders the Catalog page', () => {
  render(
    <BrowserRouter>
      <CatalogPage />
    </BrowserRouter>,
  );
  expect(true).toBeTruthy();
});
