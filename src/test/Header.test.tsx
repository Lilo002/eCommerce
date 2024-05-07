import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Header } from '../components/header/header';

test('Renders the Header', () => {
  render(
    <Router>
      <Header />
    </Router>,
  );
  expect(true).toBeTruthy();
});

test('Should render menu', () => {
  render(
    <Router>
      <Header />
    </Router>,
  );
  expect(screen.getByText('Main')).toBeInTheDocument();
  expect(screen.getByText('Catalog')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
});

test('Checking for the Registration button and Log in button', () => {
  render(
    <Router>
      <Header />
    </Router>,
  );

  const registrationButton = screen.getByRole('button', { name: /Registration/i });
  expect(registrationButton).toBeInTheDocument();

  const logInButton = screen.getByRole('button', { name: /Log in/i });
  expect(logInButton).toBeInTheDocument();
});
