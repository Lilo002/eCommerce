import { ClientResponse, CustomerDraft, CustomerSignInResult} from "@commercetools/platform-sdk";
import { getApiRoot } from "./client";

export const getCustomers = async () => {
  const project = await getApiRoot()
    .customers()
    .get()
    .execute();
  return project.body;
}



export const createCustomer = ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  addresses}: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {

    return getApiRoot()
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
