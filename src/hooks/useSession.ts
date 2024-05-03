import { useEffect, useState } from "react"
import { ClientResponse, Project } from "@commercetools/platform-sdk";
import { getAnonymousApiRoot, getLoginApiRoot } from "../sdk/client/ClientBuilder";
import { LoginCustomerDraft, authenticateCustomer, getProject } from "../sdk/api";

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [auth, setAuth] = useState<Project | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async ({email, password}: LoginCustomerDraft): Promise<void | Error> => {
    return authenticateCustomer(apiRoot, {email, password})
      .then(() => {
        setApiRoot(getLoginApiRoot({email, password}))
        setEmail(email);
        setPassword(password);
      })
  }

  const logout = () => {
    setApiRoot(getAnonymousApiRoot());
    setEmail('');
    setPassword('');
    setAuth(null);
  }

  useEffect(() => {
    getProject(apiRoot).then((data: ClientResponse<Project>) => setAuth(data.body));
  }, [apiRoot])

  return {
    isAuth: Boolean(auth),
    isLogin: Boolean(email),
    auth,
    login,
    logout,
  }
}