import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { BasketPage } from '../pages/basket/page';

test('Renders the Basket page', () => {
  render(
    <Router>
      <BasketPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
