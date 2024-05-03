import { useEffect, useState } from "react"
import { ClientResponse, Project } from "@commercetools/platform-sdk";
import { getAnonymousApiRoot, getLoginApiRoot } from "../sdk/client/ClientBuilder";
import { authenticateCustomer, getProject } from "../sdk/api";

export const useSession = () => {
  const [apiRoot, setApiRoot] = useState(getAnonymousApiRoot());
  const [auth, setAuth] = useState<Project | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = ({email, password}: {email: string; password: string}) => {
    authenticateCustomer(apiRoot, {email, password}).then(data => console.log(data))
    setApiRoot(getLoginApiRoot({email, password}))
    setEmail(email);
    setPassword(password);
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
    auth,
    login,
    logout,
  }
}