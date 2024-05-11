import { useEffect, useState } from 'react';
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
import { getAnonymousApiRoot, getLoginApiRoot } from '../sdk/client/ClientBuilder';

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [auth, setAuth] = useState<Project | null>(null);
  const [isLogin, setLogin] = useState(false);

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
    createCustomer(apiRoot, { email, password, firstName, lastName, dateOfBirth, addresses }).then((res) => {
      const { version } = res.body.customer;
      const addressesResponse = res.body.customer.addresses;
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
  };

  const checkIsCustomerExist = (email: string) => getCustomerByEmail(apiRoot, email);

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
