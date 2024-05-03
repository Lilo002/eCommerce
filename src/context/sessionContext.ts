import { Project } from "@commercetools/platform-sdk";
import { createContext } from "react";

// export const anonymousContext = createContext<{user: Project | null}>({user: null})
export const sessionContext = createContext<{session: {
  isAuth: boolean;
  auth: Project | null;
  login: ({ email, password }: {
      email: string;
      password: string;
  }) => void;
  logout: () => void;
  isLogin: boolean;
}  | null}>({session: null})