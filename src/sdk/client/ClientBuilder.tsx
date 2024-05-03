import {
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2'
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk'

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || ''

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
}

const createPasswordClient = ({ email, password }: {email: string; password: string}): Client => {
  const passwordAuthOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password
      },
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(passwordAuthOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const createAnonymousClient = (): Client => {
  const anonymousAuthOptions: AnonymousAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      anonymousId: crypto.randomUUID(),
    },
    scopes: [`manage_project:${projectKey}`],
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(anonymousAuthOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

/* export const getApiRoot = () => {
  //получить данные из хранилища
  function getCustomerData() {
    return null;
  }

  const customerData = getCustomerData();

  return customerData
    ? createApiBuilderFromCtpClient(createPasswordClient(customerData)).withProjectKey({projectKey})
    : createApiBuilderFromCtpClient(createAnonymousClient()).withProjectKey({projectKey})
} */

export const getAnonymousApiRoot = () => {
  return createApiBuilderFromCtpClient(createAnonymousClient()).withProjectKey({projectKey})
}

export const getLoginApiRoot = (customerData: {email: string, password: string}) => {
  return createApiBuilderFromCtpClient(createPasswordClient(customerData)).withProjectKey({projectKey});
}
