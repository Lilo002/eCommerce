import { createContext } from 'react';
import { ClientResponse, Customer, MyCustomerChangePassword, Product } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import { AddressDraft, CustomerDraft, LoginCustomerDraft, UpdateCustomerDraft } from '../sdk/api';

export const sessionContext = createContext<{
  session: {
    userData: Customer | null;
    login: ({ email, password }: LoginCustomerDraft) => Promise<void | Error>;
    logout: () => void;
    isLogin: boolean;
    updateCustomerInfo: ({ email, firstName, lastName, dateOfBirth }: UpdateCustomerDraft) => Promise<void | Error>;
    updatePassword: ({
      version,
      currentPassword,
      newPassword,
    }: MyCustomerChangePassword) => Promise<ClientResponse<Customer>>;
    register: (
      { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
      setAsDefaultShippingAddress: boolean,
      setAsDefaultBillingAddress: boolean,
    ) => Promise<void | Error>;
    checkCustomerExistsByEmail: (email: LoginCustomerDraft['email']) => Promise<boolean>;
    getAllProducts: (limit: number) => Promise<Product[]>;
    addAddress: ({ streetName, postalCode, city, country }: AddressDraft) => Promise<ClientResponse<Customer>>;
  } | null;
}>({ session: null });
