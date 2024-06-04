import { createContext } from 'react';
import {
  Address,
  Cart,
  Category,
  Customer,
  MyCustomerChangePassword,
  Product,
  ProductProjection,
} from '@commercetools/platform-sdk';

import {
  AddressDraft,
  CustomerDraft,
  CustomerUpdate,
  LoginCustomerDraft,
  ParamsRequestCategories,
  ParamsRequestProducts,
  UpdateCustomerDraft,
} from '../sdk/api';

export const sessionContext = createContext<{
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
      sort,
      filter,
      priceCurrency,
    }: ParamsRequestProducts) => Promise<ProductProjection[]>;
    findProduct: (productName: string) => Promise<ProductProjection[]>;
    addAddress: ({ streetName, postalCode, city, country }: AddressDraft) => Promise<Customer>;
    addAddressInfo: ({ actions, version }: CustomerUpdate) => Promise<Customer>;
    removeAddress: (addressId: Address['id']) => Promise<Customer>;
    updateAddress: (addressId: Address['id'], address: AddressDraft) => Promise<Customer>;
    getAllCategories: ({ limit }: ParamsRequestCategories) => Promise<Category[]>;
    cart: () => Promise<Cart | Error>;
    addProductToCart: (idProduct: string, idCart: string, versionCart: number) => Promise<Cart>;
    // removeProductFromCart: (idProduct: string, idCart: string, versionCart: number) => Promise<Cart>;
    cartData: Cart;
    isCart: boolean;
  } | null;
}>({ session: null });
