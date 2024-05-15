import { createContext } from 'react';

import { CustomerDraft, LoginCustomerDraft } from '../sdk/api';

export const sessionContext = createContext<{
  session: {
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
