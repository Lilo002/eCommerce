import { useEffect, useState } from 'react';
import { ClientResponse, Project } from '@commercetools/platform-sdk';

import { authenticateCustomer, createCustomer, CustomerDraft, getProject, LoginCustomerDraft } from '../sdk/api';
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

  const register = ({
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses,
  }: CustomerDraft): Promise<void | Error> => {
    console.log(addresses);
    return createCustomer(apiRoot, { email, password, firstName, lastName, dateOfBirth, addresses }).then((res) => {
      console.log(res);
      login({ email, password });
    });
  };

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
