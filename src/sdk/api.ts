import { ClientResponse, CustomerSignInResult } from "@commercetools/platform-sdk";
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";

export const getProject = (apiRoot: ByProjectKeyRequestBuilder) =>  apiRoot.get().execute();

export const authenticateCustomer = async (apiRoot: ByProjectKeyRequestBuilder, {email, password}: { email: string, password: string}): Promise<ClientResponse<CustomerSignInResult>> => {

  return apiRoot
    .login()
    .post({
      body: {
        email,
        password
      },
    })
    .execute();
}