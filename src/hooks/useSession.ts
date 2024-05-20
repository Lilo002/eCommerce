import { useEffect, useLayoutEffect, useState } from 'react';
import { Address, ProductCatalogData } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  authenticateCustomer,
  createCustomer,
  CustomerDraft,
  customerUpdate,
  getCustomerByEmail,
  getProduct,
  getProject,
  LoginCustomerDraft,
} from '../sdk/api';
import { getAnonymousApiRoot, getCookie, getLoginApiRoot, getRefreshApiRoot } from '../sdk/client/ClientBuilder';

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [isLogin, setLogin] = useState(false);

  useLayoutEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (tokenObject !== null) {
      const token = tokenObject.refreshToken;

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
    document.cookie = 'token=; Max-Age=-1;';
  };

  useEffect(() => {
    getProject(apiRoot);
  }, [apiRoot]);

  const getProductFromServer = (productKey: string): Promise<ProductCatalogData> =>
    getProduct(apiRoot, productKey).then(({ body }) => body.masterData);

  return {
    isLogin,
    login,
    logout,
    register,
    checkCustomerExistsByEmail,
    getProductFromServer,
  };
};
