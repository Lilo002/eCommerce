import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Header } from '../components/header/header';

jest.mock('../components/header/ui/LIDILU.png', () => 'mocked-logo-path');

jest.mock('../context/sessionContext', () => ({
  sessionContext: {
    useContext: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Sign In and Sign Up buttons when user is not logged in', () => {
    const mockUseContext = jest.requireMock('../context/sessionContext').sessionContext.useContext;
    mockUseContext.mockReturnValue({ session: { isLogin: false } });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const signInButton = screen.getByText(/SIGN IN/i);
    expect(signInButton).toBeInTheDocument();

    const signUpButton = screen.getByText(/SIGN UP/i);
    expect(signUpButton).toBeInTheDocument();
  });

  test('does not render Log Out button when session is null', () => {
    const mockUseContext = jest.requireMock('../context/sessionContext').sessionContext.useContext;
    mockUseContext.mockReturnValue({ session: null });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    const logOutButton = screen.queryByText(/LOG OUT/i);
    expect(logOutButton).not.toBeInTheDocument();
  });

  test('calls navigate to Login page when Sign In button is clicked', () => {
    const mockNavigate = jest.requireMock('react-router-dom').useNavigate;
    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('SIGN IN'));

    expect(mockNavigateFn).toHaveBeenCalledWith('/login');
  });

  test('calls navigate to Registration page when Sign Up button is clicked', () => {
    const mockNavigate = jest.requireMock('react-router-dom').useNavigate;
    const mockNavigateFn = jest.fn();
    mockNavigate.mockReturnValue(mockNavigateFn);

    const mockUseContext = jest.requireMock('../context/sessionContext').sessionContext.useContext;
    mockUseContext.mockReturnValue({ session: { isLogin: false } });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText('SIGN UP'));

    expect(mockNavigateFn).toHaveBeenCalledWith('/registration');
  });
});
