import { useEffect, useLayoutEffect, useState } from 'react';
import { Address, Customer, MyCustomerChangePassword, Product } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  addAddressRequest,
  AddressDraft,
  authenticateCustomer,
  createCustomer,
  CustomerDraft,
  customerUpdate,
  getCustomerByEmail,
  getCustomerDetails,
  getProducts,
  getProject,
  LoginCustomerDraft,
  UpdateCustomerDraft,
  updateCustomerInfoRequest,
  updatePasswordRequest,
} from '../sdk/api';
import { getAnonymousApiRoot, getCookie, getLoginApiRoot, getRefreshApiRoot } from '../sdk/client/ClientBuilder';

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [isLogin, setLogin] = useState(false);
  const [userData, setUserData] = useState<Customer | null>(null);

  const getCustomer = (root: ByProjectKeyRequestBuilder) =>
    getCustomerDetails(root).then(({ body }) => setUserData(body));

  useLayoutEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (tokenObject !== null) {
      const token = tokenObject.refreshToken;

      const newApiRoot = getRefreshApiRoot(token);
      getCustomer(newApiRoot);

      setApiRoot(newApiRoot);
      setLogin(true);
    } else {
      setApiRoot(getAnonymousApiRoot());
    }
  }, []);

  const checkCustomerExistsByEmail = (email: string): Promise<boolean> =>
    getCustomerByEmail(apiRoot, email).then(({ body }) => body.results.length > 0);

  const login = ({ email, password }: LoginCustomerDraft, root: ByProjectKeyRequestBuilder = apiRoot): Promise<void> =>
    authenticateCustomer(root, { email, password }).then(() => {
      const newApiRoot = getLoginApiRoot({ email, password });
      setApiRoot(newApiRoot);
      setLogin(true);
      getCustomer(newApiRoot);
    });

  const updateAddresses = (
    newApiRoot: ByProjectKeyRequestBuilder,
    version: number,
    addressesResponse: Address[],
    setAsDefaultShippingAddress: boolean,
    setAsDefaultBillingAddress: boolean,
  ): void | Error => {
    customerUpdate(
      newApiRoot,
      version,
      addressesResponse,
      setAsDefaultShippingAddress,
      setAsDefaultBillingAddress,
    ).then(() => getCustomer(newApiRoot));
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

  const getAllProducts = (limit: number): Promise<Product[]> =>
    getProducts(apiRoot, limit).then(({ body }) => body.results);

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setLogin(false);
    setUserData(null);
    document.cookie = 'token=; Max-Age=-1;';
  };

  const updateCustomerInfo = async ({ email, firstName, lastName, dateOfBirth }: UpdateCustomerDraft) => {
    const { version } = userData as Customer;
    return updateCustomerInfoRequest(apiRoot, { email, firstName, lastName, dateOfBirth }, version).then(() =>
      getCustomer(apiRoot),
    );
  };

  const updatePassword = ({ version, currentPassword, newPassword }: MyCustomerChangePassword) =>
    updatePasswordRequest(apiRoot, { version, currentPassword, newPassword }).then(() => {
      const { email } = userData as Customer;
      document.cookie = 'token=; Max-Age=-1;';
      const newApiRoot = getAnonymousApiRoot();
      return login({ email, password: newPassword }, newApiRoot);
    });

  const addAddress = ({ streetName, postalCode, city, country }: AddressDraft) => {
    const { version } = userData as Customer;
    return addAddressRequest(apiRoot, { streetName, postalCode, city, country }, version).then(() =>
      getCustomer(apiRoot),
    );
  };

  useEffect(() => {
    if (!isLogin) getProject(apiRoot);
  }, [apiRoot, isLogin]);

  return {
    userData,
    isLogin,
    login,
    logout,
    register,
    checkCustomerExistsByEmail,
    getAllProducts,
    updateCustomerInfo,
    updatePassword,
    addAddress,
  };
};
