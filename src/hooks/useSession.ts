import { useEffect, useState } from 'react';
import { Address, ClientResponse, Project } from '@commercetools/platform-sdk';

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

  const login = async ({ email, password }: LoginCustomerDraft): Promise<void | Error> =>
    authenticateCustomer(apiRoot, { email, password }).then(() => {
      setApiRoot(getLoginApiRoot({ email, password }));
      setLogin(true);
    });

  const updateAdresses = (
    id: string,
    version: number,
    adressesResponse: Address[],
    setAsDefaultShippingAdress: boolean,
    setAsDefaultBillingAdress: boolean,
  ): void | Error => {
    customerUpdate(apiRoot, id, version, adressesResponse, setAsDefaultShippingAdress, setAsDefaultBillingAdress);
  };

  const register = (
    { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
    setAsDefaultShippingAdress: boolean,
    setAsDefaultBillingAdress: boolean,
  ): Promise<void | Error> =>
    createCustomer(apiRoot, { email, password, firstName, lastName, dateOfBirth, addresses }).then((res) => {
      const { id, version } = res.body.customer;
      const adressesResponse = res.body.customer.addresses;
      login({ email, password }).then(() =>
        updateAdresses(id, version, adressesResponse, setAsDefaultShippingAdress, setAsDefaultBillingAdress),
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
