import { useEffect, useLayoutEffect, useState } from 'react';
import { Address, ClientResponse, Project } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  authenticateCustomer,
  createCustomer,
  CustomerDraft,
  customerUpdate,
  getCustomerByEmail,
  getProject,
  LoginCustomerDraft,
} from '../sdk/api';
import { getAnonymousApiRoot, getCookie, getLoginApiRoot, getRefreshApiRoot } from '../sdk/client/ClientBuilder';

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [auth, setAuth] = useState<Project | null>(null);
  const [isLogin, setLogin] = useState(false);

  useLayoutEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (tokenObject !== null) {
      const token = tokenObject.refreshToken.split(':')[1];
      setApiRoot(getRefreshApiRoot(token));
      setLogin(true);
    } else {
      setApiRoot(getAnonymousApiRoot());
    }
  }, []);

  const checkCustomerExistsByEmail = (email: string): Promise<boolean> =>
    getCustomerByEmail(apiRoot, email).then(({ body }) => body.results.length > 0);

  const login = ({ email, password }: LoginCustomerDraft): Promise<void> =>
    authenticateCustomer(apiRoot, { email, password }).then(() => {
      setApiRoot(getLoginApiRoot({ email, password }));
      setLogin(true);
    });

  const updateAddresses = (
    newApiRoot: ByProjectKeyRequestBuilder,
    version: number,
    addressesResponse: Address[],
    setAsDefaultShippingAddress: boolean,
    setAsDefaultBillingAddress: boolean,
  ): void | Error => {
    customerUpdate(newApiRoot, version, addressesResponse, setAsDefaultShippingAddress, setAsDefaultBillingAddress);
  };

  const register = (
    { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
    setAsDefaultShippingAddress: boolean,
    setAsDefaultBillingAddress: boolean,
  ): Promise<void | Error> =>
    createCustomer(apiRoot, { email, password, firstName, lastName, dateOfBirth, addresses }).then(({ body }) => {
      const { version } = body.customer;
      const addressesResponse = body.customer.addresses;
      const newApiRoot = getLoginApiRoot({ email, password });

      setApiRoot(newApiRoot);
      setLogin(true);

      return updateAddresses(
        newApiRoot,
        version,
        addressesResponse,
        setAsDefaultShippingAddress,
        setAsDefaultBillingAddress,
      );
    });

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setLogin(false);
    setAuth(null);
    document.cookie = 'token=; Max-Age=-1;';
  };

  useEffect(() => {
    getProject(apiRoot).then((data: ClientResponse<Project>) => setAuth(data.body));
  }, [apiRoot]);

  return {
    isAuth: Boolean(auth),
    isLogin,
    auth,
    login,
    logout,
    register,
    checkCustomerExistsByEmail,
  };
};
