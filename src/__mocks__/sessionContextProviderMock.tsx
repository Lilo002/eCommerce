import React, { ReactNode } from 'react';
import {
  Address,
  AddressDraft,
  ClientResponse,
  Customer,
  MyCustomerChangePassword,
  Product,
  ProductCatalogData,
  Update,
} from '@commercetools/platform-sdk';

import { sessionContext } from '../context/sessionContext';
import { LoginCustomerDraft, UpdateCustomerDraft } from '../sdk/api';

type SessionContextType = {
  session: {
    getProduct: (productId: string) => Promise<ProductCatalogData>;
    userData: Customer;
    login: ({ email, password }: LoginCustomerDraft) => Promise<void | Error>;
    logout: () => void;
    isLogin: boolean;
    updateCustomerInfo: ({ email, firstName, lastName, dateOfBirth }: UpdateCustomerDraft) => Promise<void | Error>;
    updatePassword: ({
      version,
      currentPassword,
      newPassword,
    }: MyCustomerChangePassword) => Promise<ClientResponse<Customer>>;
    register: (customer: Partial<Customer>) => Promise<void | Error>;
    checkCustomerExistsByEmail: (email: string) => Promise<boolean>;
    getAllProducts: () => Promise<Product[]>;
    addAddress: ({ streetName, postalCode, city, country }: AddressDraft) => Promise<Customer>;
    addAddressInfo: ({ actions, version }: Update) => Promise<Customer>;
    removeAddress: (addressId: string | undefined) => Promise<Customer>;
    updateAddress: (addressId: string | undefined, address: Address) => Promise<Customer>;
  };
};

const mockProductData: ProductCatalogData = {
  published: true,
  current: {
    name: { 'en-GB': 'Mock Product' },
    description: { 'en-GB': 'Mock Description' },
    slug: { 'en-GB': 'mock-product' },
    categories: [],
    categoryOrderHints: {},
    metaTitle: { 'en-GB': 'Mock Meta Title' },
    metaDescription: { 'en-GB': 'Mock Meta Description' },
    metaKeywords: { 'en-GB': 'Mock Meta Keywords' },
    masterVariant: {
      id: 1,
      sku: 'mock-sku',
      key: 'mock-key',
      prices: [
        {
          id: 'price-1',
          value: { type: 'centPrecision', currencyCode: 'USD', centAmount: 1000, fractionDigits: 2 },
          country: 'US',
        },
      ],
      images: [],
      attributes: [],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
  },
  staged: {
    name: { 'en-GB': 'Mock Product' },
    description: { 'en-GB': 'Mock Description' },
    slug: { 'en-GB': 'mock-product' },
    categories: [],
    categoryOrderHints: {},
    metaTitle: { 'en-GB': 'Mock Meta Title' },
    metaDescription: { 'en-GB': 'Mock Meta Description' },
    metaKeywords: { 'en-GB': 'Mock Meta Keywords' },
    masterVariant: {
      id: 1,
      sku: 'mock-sku',
      key: 'mock-key',
      prices: [
        {
          id: 'price-1',
          value: { type: 'centPrecision', currencyCode: 'USD', centAmount: 1000, fractionDigits: 2 },
          country: 'US',
        },
      ],
      images: [],
      attributes: [],
      assets: [],
    },
    variants: [],
    searchKeywords: {},
  },
  hasStagedChanges: false,
};

const mockCustomer: Customer = {
  id: 'mock-customer-id',
  version: 1,
  createdAt: '2020-01-01T00:00:00.000Z',
  lastModifiedAt: '2020-01-01T00:00:00.000Z',
  email: 'mock@example.com',
  firstName: 'Mock',
  lastName: 'Customer',
  addresses: [],
  isEmailVerified: false,
  authenticationMode: 'Password',
};

interface SessionContextProviderMockProps {
  children: ReactNode;
}

export const SessionContextProviderMock: React.FC<SessionContextProviderMockProps> = ({ children }) => {
  const mockContextValue: SessionContextType = {
    session: {
      getProduct: jest.fn((productId: string) =>
        productId === '1' ? Promise.resolve(mockProductData) : Promise.reject(new Error('Product not found')),
      ),
      userData: mockCustomer,
      login: jest.fn(),
      logout: jest.fn(() => {}),
      isLogin: true,
      updateCustomerInfo: jest.fn(),
      updatePassword: jest.fn(),
      register: jest.fn(),
      checkCustomerExistsByEmail: jest.fn(),
      getAllProducts: jest.fn(),
      addAddress: jest.fn(),
      addAddressInfo: jest.fn(),
      removeAddress: jest.fn(),
      updateAddress: jest.fn(),
    },
  };

  return <sessionContext.Provider value={mockContextValue}>{children}</sessionContext.Provider>;
};
