import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenStore,
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

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

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
    tokenCache: {
      get: (): TokenStore => {
        const token = JSON.parse(getCookie('token') as string);
        return token;
      },
      set: (token: TokenStore) => {
        const { expirationTime } = token;

        const tokenObjectString = JSON.stringify(token);
        document.cookie = `token=${tokenObjectString}; expires=${new Date(expirationTime)};`;
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

export const authMiddlewareOptionsForRefreshTokenFlow = (refreshToken: string): Client => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    refreshToken,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

export const getAnonymousApiRoot = () =>
  createApiBuilderFromCtpClient(createAnonymousClient()).withProjectKey({ projectKey });

export const getLoginApiRoot = (customerData: { email: string; password: string }) =>
  createApiBuilderFromCtpClient(createPasswordClient(customerData)).withProjectKey({ projectKey });

export const getRefreshApiRoot = (token: string) =>
  createApiBuilderFromCtpClient(authMiddlewareOptionsForRefreshTokenFlow(token)).withProjectKey({ projectKey });
