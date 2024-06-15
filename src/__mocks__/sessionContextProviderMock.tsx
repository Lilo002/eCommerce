import React, { ReactNode } from 'react';
import {
  Address,
  AddressDraft,
  Cart,
  Category,
  Customer,
  CustomerDraft,
  CustomerUpdate,
  DiscountCode,
  DiscountCodeReference,
  MyCustomerChangePassword,
  Product,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { sessionContext } from '../context/sessionContext';
import { LoginCustomerDraft, ParamsRequestCategories, ParamsRequestProducts, UpdateCustomerDraft } from '../sdk/api';

type SessionContextType = {
  session: {
    userData: Customer;
    login: ({ email, password }: LoginCustomerDraft) => Promise<void | Error>;
    logout: () => void;
    isLogin: boolean;
    updateCustomerInfo: ({ email, firstName, lastName, dateOfBirth }: UpdateCustomerDraft) => Promise<Customer | Error>;
    updatePassword: ({ version, currentPassword, newPassword }: MyCustomerChangePassword) => Promise<void | Error>;
    register: (
      { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
      setAsDefaultShippingAddress: boolean,
      setAsDefaultBillingAddress: boolean,
    ) => Promise<void | Error>;
    checkCustomerExistsByEmail: (email: LoginCustomerDraft['email']) => Promise<boolean>;
    getProduct: (productkey: string) => Promise<Product>;
    getAllProducts: ({
      limit,
      staged,
      offset,
      sort,
      filter,
      priceCurrency,
    }: ParamsRequestProducts) => Promise<ProductProjectionPagedQueryResponse>;
    findProduct: (productName: string) => Promise<ProductProjectionPagedQueryResponse>;
    addAddress: ({ streetName, postalCode, city, country }: AddressDraft) => Promise<Customer>;
    addAddressInfo: ({ actions, version }: CustomerUpdate) => Promise<Customer>;
    removeAddress: (addressId: Address['id']) => Promise<Customer>;
    updateAddress: (addressId: Address['id'], address: AddressDraft) => Promise<Customer>;
    getAllCategories: ({ limit }: ParamsRequestCategories) => Promise<Category[]>;
    cart: Cart;
    addProductToCard: (productId: Product['id'], quantity: number) => Promise<Cart>;
    decreaseProductQuantity: (productId: Product['id'], quantity: number) => Promise<Cart>;
    updateProductQuantity: (productId: Product['id'], quantity: number) => Promise<Cart>;
    deleteCart: () => Promise<Cart>;
    addPromo: (promo: string) => Promise<Cart>;
    removePromo: (promo: DiscountCodeReference) => Promise<Cart>;
    getPromo: (ID: DiscountCodeReference['id']) => Promise<DiscountCode>;
  };
};

const mockProductData: Product = {
  key: 'mock-product-key',
  version: 1,
  createdAt: '2023-06-01T12:00:00.000Z',
  lastModifiedAt: '2023-06-01T12:00:00.000Z',
  productType: {
    id: 'product-type-id',
    typeId: 'product-type',
  },
  masterData: {
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
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1000,
              fractionDigits: 2,
            },
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
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 1000,
              fractionDigits: 2,
            },
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
    published: false,
    hasStagedChanges: false,
  },
  taxCategory: {
    id: 'tax-category-id',
    typeId: 'tax-category',
  },
  reviewRatingStatistics: {
    averageRating: 4.5,
    highestRating: 5,
    lowestRating: 1,
    count: 100,
    ratingsDistribution: [
      { rating: 5, count: 80 },
      { rating: 4, count: 15 },
      { rating: 3, count: 3 },
      { rating: 2, count: 1 },
      { rating: 1, count: 1 },
    ],
  },
  id: '',
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
      findProduct: jest.fn(),
      getAllCategories: jest.fn(),
      getProduct: jest.fn((productkey: string) =>
        productkey === '1' ? Promise.resolve(mockProductData) : Promise.reject(new Error('Product not found')),
      ),
      cart: {
        id: '',
        version: 0,
        lineItems: [],
        customLineItems: [],
        totalPrice: {
          type: 'centPrecision',
          currencyCode: 'USD',
          centAmount: 0,
          fractionDigits: 2,
        },
        taxMode: '',
        taxRoundingMode: '',
        taxCalculationMode: '',
        inventoryMode: '',
        cartState: '',
        shippingMode: '',
        shipping: [],
        itemShippingAddresses: [],
        discountCodes: [],
        directDiscounts: [],
        refusedGifts: [],
        origin: '',
        createdAt: '',
        lastModifiedAt: '',
      },
      addProductToCard: jest.fn(),
      decreaseProductQuantity: jest.fn(),
      updateProductQuantity: jest.fn(),
      deleteCart: jest.fn(),
      addPromo: jest.fn(),
      removePromo: jest.fn(),
      getPromo: jest.fn(),
    },
  };

  return <sessionContext.Provider value={mockContextValue}>{children}</sessionContext.Provider>;
};
