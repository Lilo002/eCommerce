import { ClientResponse, CustomerSignInResult} from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

export const getCustomers = async (apiRoot: ByProjectKeyRequestBuilder) => {
  const project = await apiRoot
    .customers()
    .get()
    .execute();
  return project.body;
}

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

export const createCustomer = (apiRoot: ByProjectKeyRequestBuilder) => ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  addresses}: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {

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

export const customer: CustomerDraft = {
  email: 'lfgdgb@mil.com',
  password: '123',
  firstName: 'liza',
  lastName: 'Basarab',
  dateOfBirth: "1996-12-31",
  addresses: [
    {
      'streetName': 'bla',
      'city': 'bla',
      'country': 'RU',
      'postalCode': '123',
    }
  ]
}
