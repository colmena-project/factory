import { useCallback, useContext, useState } from "react";
import { ParseServer } from "../lib/parse";
import Context from "../context/userContext";

export default function useUser() {
  const [state, setState] = useState({
    loading: false,
    error: false,
    menssageError: "",
  });
  const { isAuth, setIsAuth } = useContext(Context);

  const login = useCallback(
    async ({ username, password }) => {
      setState({ loading: true, error: false, menssageError: "" });
      await ParseServer.User.logIn(username, password)
        .then(() => {
          const currentUser = ParseServer.User.current();
          console.log(Boolean(currentUser));
          setIsAuth(Boolean(currentUser));
          setState({ loading: false, error: false, menssageError: "" });
        })
        .catch((err) => {
          setIsAuth(false);
          setState({ loading: false, error: true, menssageError: err.message });
        });
    },
    [isAuth]
  );

  const logout = useCallback(() => {
    ParseServer.User.logOut().then(() => {
      setIsAuth(false);
    });
  }, [isAuth]);

  return {
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    menssageError: state.menssageError,
    isAuth,
    login,
    logout,
  };
}
