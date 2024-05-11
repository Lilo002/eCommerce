import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { LoginCustomerDraft } from '../api';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';
export const clientId = import.meta.env.VITE_CTP_CLIENT_ID || '';
export const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET || '';
export const host = import.meta.env.VITE_CTP_AUTH_URL || '';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const createPasswordClient = ({ email, password }: LoginCustomerDraft): Client => {
  const passwordAuthOptions: PasswordAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
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
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
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

export const getAnonymousApiRoot = () =>
  createApiBuilderFromCtpClient(createAnonymousClient()).withProjectKey({ projectKey });

export const getLoginApiRoot = (customerData: { email: string; password: string }) =>
  createApiBuilderFromCtpClient(createPasswordClient(customerData)).withProjectKey({ projectKey });
