import { createContext, useState } from "react";
import { ParseServer } from "../lib/parse";

const currentUser = ParseServer.User.current();

const contextDefaultValues = {
  isAuth: Boolean(currentUser),
  setIsAuth: () => {},
};

export const Context = createContext(contextDefaultValues);

export const UserProvider = ({ children }) => {
  const initialAuth = Boolean(currentUser);
  const [isAuth, setIsAuth] = useState(initialAuth);

  const value = {
    isAuth,
    setIsAuth,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Context;
