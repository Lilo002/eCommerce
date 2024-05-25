import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Main } from '../pages/main/page';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Main Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('navigates to login page when "SIGN IN" button is clicked', () => {
    const mockNavigate = jest.requireMock('react-router-dom').useNavigate;
    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('SIGN IN'));

    expect(mockNavigateFn).toHaveBeenCalledWith('/login');
  });

  test('navigates to registration page when "SIGN UP" button is clicked', () => {
    const mockNavigate = jest.requireMock('react-router-dom').useNavigate;
    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('SIGN UP'));

    expect(mockNavigateFn).toHaveBeenCalledWith('/registration');
  });
});
