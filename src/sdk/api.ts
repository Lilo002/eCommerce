import {
  Address,
  ClientResponse,
  Customer,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSignInResult,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressDraft[];
}

export interface LoginCustomerDraft {
  email: string;
  password: string;
}

export interface AddressDraft {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export const getProject = (apiRoot: ByProjectKeyRequestBuilder) => apiRoot.get().execute();

export const authenticateCustomer = async (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, password }: LoginCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();

export const createCustomer = async (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .me()
    .signup()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
      } as CustomerDraft,
    })
    .execute();

const getCustomerUpdateActions = (
  shippingId: string,
  billingId: string,
  setAsDefaultShippingAddress: boolean,
  setAsDefaultBillingAddress: boolean,
): [
  CustomerSetDefaultShippingAddressAction | CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction | CustomerAddBillingAddressIdAction,
] => [
  {
    action: setAsDefaultShippingAddress ? 'setDefaultShippingAddress' : 'addShippingAddressId',
    addressId: shippingId,
  },
  {
    action: setAsDefaultBillingAddress ? 'setDefaultBillingAddress' : 'addBillingAddressId',
    addressId: billingId,
  },
];

export const getCustomerByEmail = (apiRoot: ByProjectKeyRequestBuilder, email: string) =>
  apiRoot
    .customers()
    .get({ queryArgs: { where: `email="${email}"` } })
    .execute();

export const customerUpdate = (
  apiRoot: ByProjectKeyRequestBuilder,
  version: number,
  addresses: Address[],
  setAsDefaultShippingAddress: boolean,
  setAsDefaultBillingAddress: boolean,
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: getCustomerUpdateActions(
          addresses[0].id || '',
          addresses[1].id || '',
          setAsDefaultShippingAddress,
          setAsDefaultBillingAddress,
        ),
      },
    })
    .execute();

export const getProducts = (apiRoot: ByProjectKeyRequestBuilder): Promise<ClientResponse<ProductPagedQueryResponse>> =>
  apiRoot
    .products()
    .get({
      queryArgs: {
        limit: 60,
        where: 'masterData(published=true)',
      },
    })
    .execute();

export const getCustomerDetails = (apiRoot: ByProjectKeyRequestBuilder) => apiRoot.me().get().execute();
