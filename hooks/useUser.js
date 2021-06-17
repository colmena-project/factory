import { useCallback, useContext, useState } from "react";
import { ParseServer } from "../lib/parse";
import Context from "../context/userContext";
import { AuthLoginType } from "../type";

export default function useUser() {
  const initValues = {
    loading: false,
    error: false,
    menssageError: "",
  };
  const [state, setState] = useState(initValues);
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
          let mensaje = err.message;
          if (err.message === "Invalid username/password.") {
            mensaje = "Usuario/Contraseña no correcto";
          }
          if (err.message === "Invalid domain") {
            mensaje = "Dominio del Aplicativo es incorrecto";
          }
          if (
            err.message ===
            'XMLHttpRequest failed: "Unable to connect to the Parse API"'
          ) {
            mensaje =
              "El Factory se encuentra en Mantenimiento. Por favor intente mas tarde.";
          }

          if (err.message === "unauthorized") {
            mensaje = "El factory no se encuentra autorizado para operar";
          }
          console.log({ mensaje });
          setState({ loading: false, error: true, menssageError: mensaje });
        });
    },
    [isAuth]
  );

  const logout = useCallback(() => {
    ParseServer.User.logOut().then(() => {
      setIsAuth(false);
    });
  }, [isAuth]);

  const requestPasswordReset = useCallback(async ({ username }) => {
    setState({ loading: true, error: false, menssageError: "" });
    await ParseServer.User.requestPasswordReset(username)
      .then(() => {
        setState({ loading: false, error: false, menssageError: "" });
      })
      .catch((err) => {
        let mensaje = err.message;
        console.log({ mensaje });
        setState({ loading: false, error: true, menssageError: mensaje });
      });
  });

  return {
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    menssageError: state.menssageError,
    isAuth,
    login,
    logout,
    requestPasswordReset,
  };
}
