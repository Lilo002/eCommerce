import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Address,
  Cart,
  Category,
  Customer,
  DiscountCode,
  DiscountCodeReference,
  LineItem,
  MyCustomerChangePassword,
  Product,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

import {
  addAddressInfoRequest,
  addAddressRequest,
  addProductToCardRequest,
  addPromoRequest,
  AddressDraft,
  authenticateCustomer,
  createCartRequest,
  createCustomer,
  CustomerDraft,
  CustomerUpdate,
  customerUpdate,
  decreaseProductQuantityRequest,
  deleteCartRequest,
  getCartRequest,
  getCategories,
  getCustomerByEmail,
  getCustomerDetails,
  getOneProduct,
  getProductByName,
  getProducts,
  getProject,
  getPromoRequest,
  LoginCustomerDraft,
  ParamsRequestCategories,
  ParamsRequestProducts,
  removeAddressRequest,
  removePromoRequest,
  updateAddressRequest,
  UpdateCustomerDraft,
  updateCustomerInfoRequest,
  updatePasswordRequest,
  updateProductQuantityRequest,
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
  const [cart, setCart] = useState<Cart | null>(null);

  const getCustomer = (root: ByProjectKeyRequestBuilder): Promise<Customer> =>
    getCustomerDetails(root).then(({ body }) => {
      setUserData(body);
      return body;
    });

  const getCart = (root: ByProjectKeyRequestBuilder): Promise<Cart> =>
    getCartRequest(root).then(({ body }) => {
      setCart(body);
      return body;
    });

  const createCart = (root: ByProjectKeyRequestBuilder): Promise<Cart> =>
    createCartRequest(root).then(({ body }) => {
      setCart(body);
      return body;
    });

  const addProductToCard = async (productId: Product['id'], quantity: number = 1): Promise<Cart> => {
    if (!cart) {
      return createCart(apiRoot)
        .then(({ id, version }) => addProductToCardRequest(apiRoot, id, version, productId, quantity))
        .then(({ body }) => {
          setCart(body);
          return body;
        });
    }

    const { id, version } = cart;
    return addProductToCardRequest(apiRoot, id, version, productId, quantity).then(({ body }) => {
      setCart(body);
      return body;
    });
  };

  const updateProductQuantity = async (productId: Product['id'], quantity: number = 0): Promise<Cart> => {
    if (cart && cart.lineItems) {
      const lineItem = cart.lineItems.find((item) => item.productId === productId);
      if (lineItem) {
        const { id: cartId, version } = cart;
        return updateProductQuantityRequest(apiRoot, cartId, version, lineItem.id, quantity).then(({ body }) => {
          setCart(body);
          return body;
        });
      }
    }

    throw new Error('Product not found in the cart');
  };

  const decreaseProductQuantity = async (
    productId: Product['id'],
    quantity: LineItem['quantity'] = 1,
  ): Promise<Cart> => {
    if (cart && cart.lineItems) {
      const lineItem = cart.lineItems.find((item) => item.productId === productId);
      if (lineItem) {
        const { id: cartId, version } = cart;
        return decreaseProductQuantityRequest(apiRoot, cartId, version, lineItem.id, quantity).then(({ body }) => {
          setCart(body);
          return body;
        });
      }
    }

    throw new Error('Product not found in the cart');
  };

  const deleteCart = async (): Promise<Cart> => {
    if (cart) {
      const { id, version } = cart;

      return deleteCartRequest(apiRoot, id, version).then(({ body }) => {
        setCart(null);
        return body;
      });
    }

    throw new Error('Something went wrong');
  };

  const addPromo = async (promo: string): Promise<Cart> => {
    if (promo && cart) {
      const { id, version } = cart;

      return addPromoRequest(apiRoot, id, version, promo).then(({ body }) => {
        setCart(body);
        return body;
      });
    }

    throw new Error('You have to enter your promo');
  };

  const removePromo = async (promo: DiscountCodeReference): Promise<Cart> => {
    if (promo && cart) {
      const { id, version } = cart;
      const { id: promoId, typeId } = promo;
      return removePromoRequest(apiRoot, id, version, promoId, typeId).then(({ body }) => {
        setCart(body);
        return body;
      });
    }

    throw new Error('There are no promo to remove');
  };

  const getPromo = async (ID: DiscountCodeReference['id']): Promise<DiscountCode> =>
    getPromoRequest(apiRoot, ID).then(({ body }) => body);

  useLayoutEffect(() => {
    const tokenObject = JSON.parse(getCookie('token') as string);
    if (tokenObject !== null) {
      const token = tokenObject.refreshToken;

      const newApiRoot = getRefreshApiRoot(token);
      getCustomer(newApiRoot);
      getCart(newApiRoot).catch(() => setCart(null));

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
      getCart(newApiRoot).catch(() => setCart(null));
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
      getCart(newApiRoot).catch(() => setCart(null));
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
    offset,
    sort,
    filter,
    priceCurrency,
  }: ParamsRequestProducts): Promise<ProductProjectionPagedQueryResponse> =>
    getProducts(apiRoot, { limit, staged, offset, sort, filter, priceCurrency }).then(({ body }) => body);

  const findProduct = (productName: string): Promise<ProductProjectionPagedQueryResponse> =>
    getProductByName(apiRoot, productName).then(({ body }) => body);

  const getAllCategories = ({ limit }: ParamsRequestCategories): Promise<Category[]> =>
    getCategories(apiRoot, { limit }).then(({ body }) => body.results);

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setLogin(false);
    setUserData(initialCustomer);
    setCart(null);

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
    addProductToCard,
    decreaseProductQuantity,
    updateProductQuantity,
    cart,
    deleteCart,
    addPromo,
    removePromo,
    getPromo,
  };
};
