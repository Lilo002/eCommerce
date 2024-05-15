import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { NotFoundPage } from '../pages/notFound/page';

test('Renders the page 404', () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>,
  );
  expect(true).toBeTruthy();
});

test('Should render headline', () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>,
  );
  expect(screen.getByText('404')).toBeInTheDocument();
});

test('Should render message', () => {
  render(
    <Router>
      <NotFoundPage />
    </Router>,
  );
  expect(screen.getByText('Sorry, the page you visited does not exist.')).toBeInTheDocument();
});
