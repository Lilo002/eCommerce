import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import { AboutPage } from '../pages/about/page';

test('Renders the About page', () => {
  render(
    <Router>
      <AboutPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});
