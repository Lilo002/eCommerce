import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test('Should render headline', () => {
  render(<App />);
  expect(screen.getByText('Hello World!!!')).toBeInTheDocument();
});
