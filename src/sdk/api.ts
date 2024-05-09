import {
  Address,
  ClientResponse,
  Customer,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSignInResult,
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
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();

export const createCustomer = (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .customers()
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
  setAsDefaultShippingAdress: boolean,
  setAsDefaultBillingAdress: boolean,
): [
  CustomerSetDefaultShippingAddressAction | CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction | CustomerAddBillingAddressIdAction,
] => [
  {
    action: setAsDefaultShippingAdress ? 'setDefaultShippingAddress' : 'addShippingAddressId',
    addressId: shippingId,
  },
  {
    action: setAsDefaultBillingAdress ? 'setDefaultBillingAddress' : 'addBillingAddressId',
    addressId: billingId,
  },
];

export const customerUpdate = (
  apiRoot: ByProjectKeyRequestBuilder,
  id: string,
  version: number,
  addresses: Address[],
  setAsDefaultShippingAdress: boolean,
  setAsDefaultBillingAdress: boolean,
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: getCustomerUpdateActions(
          addresses[0].id || '',
          addresses[1].id || '',
          setAsDefaultShippingAdress,
          setAsDefaultBillingAdress,
        ),
      },
    })
    .execute();
