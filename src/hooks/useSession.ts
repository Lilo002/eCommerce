import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Address,
  Cart,
  Category,
  ClientResponse,
  Customer,
  MyCustomerChangePassword,
  Product,
  ProductProjection,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  addAddressInfoRequest,
  addAddressRequest,
  addProductToCartOnServer,
  AddressDraft,
  authenticateCustomer,
  createAnonimCart,
  createCustomer,
  CustomerDraft,
  CustomerUpdate,
  customerUpdate,
  getCategories,
  getCustomerByEmail,
  getCustomerDetails,
  getOneProduct,
  getProductByName,
  getProducts,
  getProject,
  LoginCustomerDraft,
  ParamsRequestCategories,
  ParamsRequestProducts,
  removeAddressRequest,
  updateAddressRequest,
  UpdateCustomerDraft,
  updateCustomerInfoRequest,
  updatePasswordRequest,
} from '../sdk/api';
import { getAnonymousApiRoot, getCookie, getLoginApiRoot, getRefreshApiRoot } from '../sdk/client/ClientBuilder';

const initialCustomer: Customer = {
  version: 0,
  email: '',
  id: '',
  addresses: [],
  authenticationMode: '',
  createdAt: '',
  isEmailVerified: false,
  lastModifiedAt: '',
};

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [isLogin, setLogin] = useState(false);
  const [userData, setUserData] = useState<Customer>(initialCustomer);
  const [cartData, setCartData] = useState<Cart>();

  const getCustomer = (root: ByProjectKeyRequestBuilder): Promise<Customer> =>
    getCustomerDetails(root).then(({ body }) => {
      setUserData(body);
      return body;
    });

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

  const getAllProducts = ({
    limit,
    staged,
    sort,
    filter,
    priceCurrency,
  }: ParamsRequestProducts): Promise<ProductProjection[]> =>
    getProducts(apiRoot, { limit, staged, sort, filter, priceCurrency }).then(({ body }) => body.results);

  const findProduct = (productName: string): Promise<ProductProjection[]> =>
    getProductByName(apiRoot, productName).then(({ body }) => body.results);

  const getAllCategories = ({ limit }: ParamsRequestCategories): Promise<Category[]> =>
    getCategories(apiRoot, { limit }).then(({ body }) => body.results);

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setLogin(false);
    setUserData(initialCustomer);
    document.cookie = 'token=; Max-Age=-1;';
  };

  const updateCustomerInfo = async ({
    email,
    firstName,
    lastName,
    dateOfBirth,
  }: UpdateCustomerDraft): Promise<Customer> => {
    const { version } = userData;
    return updateCustomerInfoRequest(apiRoot, { email, firstName, lastName, dateOfBirth }, version).then(({ body }) => {
      setUserData(body);
      return body;
    });
  };

  const updatePassword = ({ version, currentPassword, newPassword }: MyCustomerChangePassword) =>
    updatePasswordRequest(apiRoot, { version, currentPassword, newPassword }).then(() => {
      const { email } = userData;
      document.cookie = 'token=; Max-Age=-1;';
      const newApiRoot = getAnonymousApiRoot();
      return login({ email, password: newPassword }, newApiRoot);
    });

  const addAddress = async ({ streetName, postalCode, city, country }: AddressDraft): Promise<Customer> => {
    const { version } = userData;
    return addAddressRequest(apiRoot, { streetName, postalCode, city, country }, version).then(({ body }) => {
      setUserData(body);
      return body;
    });
  };

  const addAddressInfo = ({ actions, version }: CustomerUpdate) =>
    addAddressInfoRequest(apiRoot, actions, version).then(({ body }) => {
      setUserData(body);
      return body;
    });

  const removeAddress = async (addressId: Address['id']) => {
    const { version } = userData;

    return removeAddressRequest(apiRoot, addressId, version).then(({ body }) => {
      setUserData(body);
      return body;
    });
  };

  const updateAddress = async (addressId: Address['id'], address: AddressDraft) => {
    const { version } = userData;
    return updateAddressRequest(apiRoot, addressId, address, version).then(({ body }) => {
      setUserData(body);
      return body;
    });
  };

  useEffect(() => {
    if (!isLogin) getProject(apiRoot);
  }, [apiRoot, isLogin]);

  const getProduct = (productKey: string): Promise<Product> =>
    getOneProduct(apiRoot, productKey).then(({ body }) => body);

  const cart = () => createAnonimCart(apiRoot).then((res: ClientResponse) => setCartData(res.body));

  const addProductToCart = (idProduct: string, idCart: string, versionCart: number): Promise<Cart> =>
    addProductToCartOnServer(apiRoot, idProduct, idCart, versionCart).then(({ body }) => {
      setCartData(body);
      return body;
    });

  // const removeProductFromCart = (idProduct: string, idCart: string, versionCart: number): Promise<Cart> =>
  //   removeProductFromCartOnServer(apiRoot, idProduct, idCart, versionCart).then(({ body }) => {
  //     setCartData(body);
  //     return body;
  //   });

  return {
    userData,
    isLogin,
    login,
    logout,
    register,
    checkCustomerExistsByEmail,
    getProduct,
    getAllProducts,
    findProduct,
    updateCustomerInfo,
    updatePassword,
    addAddress,
    addAddressInfo,
    removeAddress,
    updateAddress,
    getAllCategories,
    cart,
    cartData,
    addProductToCart,
    // removeProductFromCart,
  };
};
