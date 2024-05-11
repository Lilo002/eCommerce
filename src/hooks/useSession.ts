import { useEffect, useState } from 'react';
import { Address, ClientResponse, Project } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  authenticateCustomer,
  createCustomer,
  CustomerDraft,
  customerUpdate,
  getProject,
  LoginCustomerDraft,
} from '../sdk/api';
import { getAnonymousApiRoot, getLoginApiRoot } from '../sdk/client/ClientBuilder';

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [auth, setAuth] = useState<Project | null>(null);
  const [isLogin, setLogin] = useState(false);

  const login = async ({ email, password }: LoginCustomerDraft): Promise<ByProjectKeyRequestBuilder> =>
    authenticateCustomer(apiRoot, { email, password }).then(() => {
      const newApiRoot = getLoginApiRoot({ email, password });
      setApiRoot(newApiRoot);
      setLogin(true);
      return newApiRoot;
    });

  const updateAddresses = (
    newApiRoot: ByProjectKeyRequestBuilder,
    id: string,
    version: number,
    addressesResponse: Address[],
    setAsDefaultShippingAddress: boolean,
    setAsDefaultBillingAddress: boolean,
  ): void | Error => {
    customerUpdate(newApiRoot, id, version, addressesResponse, setAsDefaultShippingAddress, setAsDefaultBillingAddress);
  };

  const register = (
    { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
    setAsDefaultShippingAddress: boolean,
    setAsDefaultBillingAddress: boolean,
  ): Promise<void | Error> =>
    createCustomer(apiRoot, { email, password, firstName, lastName, dateOfBirth, addresses }).then((res) => {
      const { id, version } = res.body.customer;
      const addressesResponse = res.body.customer.addresses;
      login({ email, password }).then((newApiRoot) =>
        updateAddresses(
          newApiRoot,
          id,
          version,
          addressesResponse,
          setAsDefaultShippingAddress,
          setAsDefaultBillingAddress,
        ),
      );
    });

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setLogin(false);
    setAuth(null);
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
  };
};
