import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Main } from '../pages/main/page';

test('Renders the Main page', () => {
  render(
    <Router>
      <Main />
    </Router>,
  );
  expect(true).toBeTruthy();
});

test('Should render headline', () => {
  render(
    <Router>
      <Main />
    </Router>,
  );
  expect(screen.getByText('Main page')).toBeInTheDocument();
});

test('Checking for the Registration button and Log in button', () => {
  render(
    <Router>
      <Main />
    </Router>,
  );

  const registrationButton = screen.getByRole('button', { name: /to Registration/i });
  expect(registrationButton).toBeInTheDocument();

  const logInButton = screen.getByRole('button', { name: /to login/i });
  expect(logInButton).toBeInTheDocument();
});
