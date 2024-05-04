import { Project } from '@commercetools/platform-sdk';
import { createContext } from 'react';
import { LoginCustomerDraft } from '../sdk/api';

// export const anonymousContext = createContext<{user: Project | null}>({user: null})
export const sessionContext = createContext<{
  session: {
    isAuth: boolean;
    auth: Project | null;
    login: ({ email, password }: LoginCustomerDraft) => Promise<void | Error>;
    logout: () => void;
    isLogin: boolean;
  } | null;
}>({ session: null });
