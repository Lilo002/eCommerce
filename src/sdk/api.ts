import {
  Address,
  Cart,
  CategoryPagedQueryResponse,
  ClientResponse,
  Customer,
  CustomerAddBillingAddressIdAction,
  CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSignInResult,
  DiscountCode,
  DiscountCodeReference,
  LineItem,
  MyCustomerChangePassword,
  MyCustomerUpdateAction,
  Product,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export interface CustomerUpdate {
  actions: MyCustomerUpdateAction[];
  version: Customer['version'];
}
export interface CustomerDraft {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: AddressDraft[];
}

export interface LoginCustomerDraft {
  email: string;
  password: string;
}

export interface AddressDraft {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface UpdateCustomerDraft {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface ParamsRequestProducts {
  limit: number;
  staged: boolean;
  offset: number;
  sort?: string | null;
  filter?: string[];
  priceCurrency?: string | null;
}

export interface ParamsRequestCategories {
  limit: number;
}

export const getProject = (apiRoot: ByProjectKeyRequestBuilder) => apiRoot.get().execute();

export const authenticateCustomer = async (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, password }: LoginCustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();

export const createCustomer = async (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> =>
  apiRoot
    .me()
    .signup()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses,
      } as CustomerDraft,
    })
    .execute();

const getCustomerUpdateActions = (
  shippingId: string,
  billingId: string,
  setAsDefaultShippingAddress: boolean,
  setAsDefaultBillingAddress: boolean,
): [
  CustomerSetDefaultShippingAddressAction | CustomerAddShippingAddressIdAction,
  CustomerSetDefaultBillingAddressAction | CustomerAddBillingAddressIdAction,
] => [
  {
    action: setAsDefaultShippingAddress ? 'setDefaultShippingAddress' : 'addShippingAddressId',
    addressId: shippingId,
  },
  {
    action: setAsDefaultBillingAddress ? 'setDefaultBillingAddress' : 'addBillingAddressId',
    addressId: billingId,
  },
];

export const getCustomerByEmail = (apiRoot: ByProjectKeyRequestBuilder, email: string) =>
  apiRoot
    .customers()
    .get({ queryArgs: { where: `email="${email}"` } })
    .execute();

export const customerUpdate = (
  apiRoot: ByProjectKeyRequestBuilder,
  version: number,
  addresses: Address[],
  setAsDefaultShippingAddress: boolean,
  setAsDefaultBillingAddress: boolean,
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: getCustomerUpdateActions(
          addresses[0].id || '',
          addresses[1].id || '',
          setAsDefaultShippingAddress,
          setAsDefaultBillingAddress,
        ),
      },
    })
    .execute();

export const getOneProduct = (
  apiRoot: ByProjectKeyRequestBuilder,
  productKey: string,
): Promise<ClientResponse<Product>> => apiRoot.products().withKey({ key: productKey }).get().execute();

export const getProducts = (
  apiRoot: ByProjectKeyRequestBuilder,
  { limit, staged, offset, sort, filter, priceCurrency }: ParamsRequestProducts,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const queryArgs: {
    limit: number;
    staged: boolean;
    offset: number;
    sort?: string;
    'filter.query'?: string[];
    priceCurrency?: string;
  } = {
    limit,
    staged,
    offset,
  };

  if (sort) {
    queryArgs.sort = sort;
  }

  if (filter) {
    queryArgs['filter.query'] = filter;
  }

  if (priceCurrency) {
    queryArgs.priceCurrency = priceCurrency;
  }

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();
};

export const getProductByName = (
  apiRoot: ByProjectKeyRequestBuilder,
  productName: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        fuzzy: true,
        'text.en-GB': productName,
      },
    })
    .execute();

export const getCategories = (
  apiRoot: ByProjectKeyRequestBuilder,
  { limit }: ParamsRequestCategories,
): Promise<ClientResponse<CategoryPagedQueryResponse>> =>
  apiRoot
    .categories()
    .get({
      queryArgs: {
        limit,
      },
    })
    .execute();

export const getCustomerDetails = (apiRoot: ByProjectKeyRequestBuilder) => apiRoot.me().get().execute();

export const updateCustomerInfoRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  { email, firstName, lastName, dateOfBirth }: UpdateCustomerDraft,
  version: Customer['version'],
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeEmail',
            email,
          },
          {
            action: 'setFirstName',
            firstName,
          },
          {
            action: 'setLastName',
            lastName,
          },
          {
            action: 'setDateOfBirth',
            dateOfBirth,
          },
        ],
      },
    })
    .execute();

export const updatePasswordRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  { version, currentPassword, newPassword }: MyCustomerChangePassword,
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .password()
    .post({
      body: {
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();

export const addAddressRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  { streetName, postalCode, city, country }: AddressDraft,
  version: Customer['version'],
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addAddress',
            address: {
              streetName,
              postalCode,
              city,
              country,
            },
          },
        ],
      },
    })
    .execute();

export const addAddressInfoRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  actions: MyCustomerUpdateAction[],
  version: Customer['version'],
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();

export const removeAddressRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  addressId: Address['id'],
  version: Customer['version'],
): Promise<ClientResponse<Customer>> =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeAddress',
            addressId,
          },
        ],
      },
    })
    .execute();

export const updateAddressRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  addressId: Address['id'],
  address: Address,
  version: Customer['version'],
) =>
  apiRoot
    .me()
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeAddress',
            addressId,
            address,
          },
        ],
      },
    })
    .execute();

export const getCartRequest = (apiRoot: ByProjectKeyRequestBuilder): Promise<ClientResponse<Cart>> =>
  apiRoot.me().activeCart().get().execute();

export const createCartRequest = (apiRoot: ByProjectKeyRequestBuilder): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD' } })
    .execute();

export const addProductToCardRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
  productId: Product['id'],
  quantity: number,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const decreaseProductQuantityRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
  lineItemId: LineItem['id'],
  quantity: number,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const updateProductQuantityRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
  lineItemId: LineItem['id'],
  quantity: number,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

export const deleteCartRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
): Promise<ClientResponse<Cart>> => apiRoot.me().carts().withId({ ID }).delete({ queryArgs: { version } }).execute();

export const addPromoRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
  code: string,
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();

export const removePromoRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: Cart['id'],
  version: Cart['version'],
  id: DiscountCodeReference['id'],
  typeId: DiscountCodeReference['typeId'],
): Promise<ClientResponse<Cart>> =>
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId,
              id,
            },
          },
        ],
      },
    })
    .execute();

export const getPromoRequest = (
  apiRoot: ByProjectKeyRequestBuilder,
  ID: DiscountCodeReference['id'],
): Promise<ClientResponse<DiscountCode>> => apiRoot.discountCodes().withId({ ID }).get().execute();
