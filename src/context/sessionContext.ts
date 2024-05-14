import { createContext } from 'react';
import { Project } from '@commercetools/platform-sdk';

import { CustomerDraft, LoginCustomerDraft } from '../sdk/api';

// export const anonymousContext = createContext<{user: Project | null}>({user: null})
export const sessionContext = createContext<{
  session: {
    isAuth: boolean;
    auth: Project | null;
    login: ({ email, password }: LoginCustomerDraft) => Promise<void | Error>;
    logout: () => void;
    isLogin: boolean;
    register: (
      { email, password, firstName, lastName, dateOfBirth, addresses }: CustomerDraft,
      setAsDefaultShippingAddress: boolean,
      setAsDefaultBillingAddress: boolean,
    ) => Promise<void | Error>;
    checkCustomerExistsByEmail: (email: LoginCustomerDraft['email']) => Promise<boolean>;
  } | null;
}>({ session: null });
