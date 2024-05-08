import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
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
): Promise<ClientResponse<CustomerSignInResult>> => {
  console.log(email, password, firstName, lastName, dateOfBirth, addresses);
  return apiRoot
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
};
