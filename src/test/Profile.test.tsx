import { BrowserRouter } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import { fireEvent, render, screen } from '@testing-library/react';
import PropTypes from 'prop-types';

import '@testing-library/jest-dom';

import { sessionContext } from '../context/sessionContext';
import { ProfilePage } from '../pages/profile/page';

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const Form = ({ children }: { children: React.ReactNode }) => <form>{children}</form>;
  Form.propTypes = {
    children: PropTypes.node.isRequired,
  };
  Form.useForm = () => [{ getFieldValue: jest.fn(), setFieldsValue: jest.fn(), validateFields: jest.fn() }, {}];

  const FormItem = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  Form.Item = FormItem;

  return {
    ...antd,
    Form,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('../sdk/client/ClientBuilder', () => ({
  getCookie: jest.fn(() => JSON.stringify({ token: 'test-token' })),
}));

jest.mock('../sdk/api', () => ({
  UpdateCustomerDraft: jest.fn(),
}));

describe('ProfilePage', () => {
  const mockUpdateCustomerInfo = jest.fn();
  const mockUpdatePassword = jest.fn();

  const session = {
    userData: {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
      version: 1,
    } as Customer,
    updateCustomerInfo: mockUpdateCustomerInfo,
    updatePassword: mockUpdatePassword,
    login: jest.fn().mockResolvedValue(undefined),
    logout: jest.fn(),
    isLogin: true,
    register: jest.fn().mockResolvedValue(undefined),
    checkCustomerExistsByEmail: jest.fn().mockResolvedValue(undefined),
    getProduct: jest.fn().mockResolvedValue(undefined),
    getAllProducts: jest.fn().mockResolvedValue(undefined),
    updateAddress: jest.fn().mockResolvedValue(undefined),
    removeAddress: jest.fn().mockResolvedValue(undefined),
    addAddress: jest.fn().mockResolvedValue(undefined),
    addAddressInfo: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <sessionContext.Provider value={{ session }}>
          <ProfilePage />
        </sessionContext.Provider>
      </BrowserRouter>,
    );
  };

  test('should render ProfilePage with correct initial data', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('test@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('2000-01-01')).toBeInTheDocument();
  });

  test('should switch to edit mode when edit button is clicked', () => {
    renderComponent();

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByPlaceholderText('test@example.com')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('John')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('Doe')).not.toBeDisabled();
  });

  test('renders profile page with general tab selected', () => {
    const { getByText } = render(<ProfilePage />);
    const generalTab = getByText('General');
    expect(generalTab).toBeInTheDocument();
    expect(generalTab).toHaveAttribute('aria-selected', 'true');
  });
});
