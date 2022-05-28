import { createContext, ReactElement, useEffect, useState } from "react";
import { ParseServer } from "../lib/parse";
import { profileApi } from "../services";

const currentUser = ParseServer.User.current();

const contextDefaultValues = {
  isAuth: Boolean(currentUser),
  setIsAuth: () => {},
  account: undefined,
  setAccount: () => {},
  factory: undefined,
  setFactory: () => {},
};

export const Context = createContext(contextDefaultValues);

export const UserProvider = ({ children }) => {
  const initialAuth = Boolean(currentUser);
  const [isAuth, setIsAuth] = useState(initialAuth);
  const [account, setAccount] = useState(undefined);
  const [factory, setFactory] = useState(undefined);

  const getAccount = async (currentUser) => {
    if (currentUser !== null) {
      const datas = await Promise.allSettled([
        profileApi.getMyAccount(currentUser.id, true),
        profileApi.getMyFactorys(currentUser.id),
      ]);
      const [account, factorys] = datas;
      setAccount(account.value);
      setFactory(factorys.value);
    }
  };

  useEffect(() => getAccount(currentUser), []);

  const value = {
    isAuth,
    setIsAuth,
    account,
    setAccount,
    factory,
    setFactory,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Context;
