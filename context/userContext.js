import { createContext, ReactElement, useEffect, useState } from "react";
import { ParseServer } from "../lib/parse";
import { profileApi } from "../services";

const currentUser = ParseServer.User.current();

const contextDefaultValues = {
  isAuth: Boolean(currentUser),
  setIsAuth: () => {},
  account: undefined,
  setAccount: () => {},
};

export const Context = createContext(contextDefaultValues);

export const UserProvider = ({ children }) => {
  const initialAuth = Boolean(currentUser);
  const [isAuth, setIsAuth] = useState(initialAuth);
  const [account, setAccount] = useState(undefined);

  const getAccount = async (currentUser) => {
    if (currentUser !== null) {
      const data = await profileApi.getMyAccount(currentUser.id);
      setAccount(data);
    }
  };

  useEffect(() => getAccount(currentUser), []);

  const value = {
    isAuth,
    setIsAuth,
    account,
    setAccount,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Context;
