import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";
import { Spinner } from "../../components/general/Spinner";
import { Button } from "../../components/button";
import { profileApi } from "../../services";
import { ParseServer } from "../../lib/parse";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const LoginForm = ({ setAccount }: { setAccount: Function }) => {
  const { isLoginLoading, hasLoginError, menssageError, login, isAuth } =
    useUser();

  const router = useRouter();

  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Requerido")
      .min(4, "Debe contener un minimo de 4 caracteres")
      .max(255, "255 caracteres es el maximo"),
    password: Yup.string()
      .required("Requerido")
      .min(4, "Debe contener un minimo de 4 caracteres")
      .max(255, "255 caracteres es el maximo"),
  });

  const onSubmitHandler = async ({ username, password }) => {
    login({ username, password });
  };

  const setAccountData = async () => {
    const currentUser = ParseServer.User.current();
    const data = await profileApi.getMyAccount(currentUser.id, true);
    setAccount(data);
  };

  useEffect(() => {
    if (isAuth) {
      setAccountData();
      router.push("/");
    }
  }, [isAuth]);

  return (
    <>
      <div className="logo">
        <Image
          src="/img/logo.png"
          className="logo_image"
          alt="Logo"
          width="213"
          height="46"
        />
      </div>

      {isLoginLoading && (
        <div className="message_container">
          <div className="message">
            <Spinner />
            <strong className="message_info">
              Controlando las credenciales
            </strong>
          </div>
        </div>
      )}
      {isAuth && (
        <div className="message_container">
          <div className="message">
            <Spinner />
            <strong className="message_info">Redireccionando</strong>
          </div>
        </div>
      )}

      <div className="form_login">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          <Form className="form_login">
            <div className="form-control">
              <label>Usuario</label>
              <Field
                id="username"
                type="text"
                className="input_login"
                name="username"
              />
              <ErrorMessage name="username">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label>Contraseña</label>
              <Field
                id="password"
                type="password"
                className="input_login"
                name="password"
              />
              <ErrorMessage name="password">
                {(msg) => <span className="error">{msg}</span>}
              </ErrorMessage>
            </div>

            {hasLoginError && (
              <div className="form-control">
                <strong className="error">{menssageError}</strong>
              </div>
            )}

            <div className="box">
              <div className="box_item">
                <Button>Iniciar Sesión</Button>
              </div>
              <div className="box_item">
                <Link href="/auth/reset-password">
                  <a className="w-full text-center no-underline inline-block align-baseline font-bold xs:text-sm text-xs text-blue hover:text-blue-dark float-right">
                    Recuperar Contraseña?
                  </a>
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>

      <style jsx>
        {`
          .logo {
            @apply flex items-center justify-center mb-6;
          }
          .logo_image {
            @apply w-1/2;
          }

          .form_login {
            @apply border-colmena p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg w-auto h-auto static;
          }

          .front {
            @apply absolute top-0 left-0 w-full h-full bg-opacity-20 bg-green-100  backdrop-filter backdrop-blur;
            animation: fadeIn linear 7s;
            animation: fadeOut linear 7s;
          }

          .message_container {
            @apply absolute top-0 left-0 w-screen h-screen flex justify-center items-center text-sm;
            @apply bg-opacity-20 bg-green-100  backdrop-filter backdrop-blur;
            animation: fadeIn linear 7s;
            animation: fadeOut linear 7s;
          }

          .message {
            @apply bg-white m-7 p-12 flex flex-wrap content-center;
          }

          .form-control {
            @apply mb-4;
          }

          label {
            @apply font-bold text-gray-800 block mb-2;
          }

          :global(input.input_login) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-2 py-2 rounded;
            @apply hover:border-colmena focus:border-colmena focus:ring-colmena focus:outline-none focus:ring-2;
          }

          .error {
            @apply text-red-700 mt-1 text-xs;
          }

          .box {
            @apply flex items-center justify-between;
          }

          .box_item {
            @apply m-2;
          }

          .message_info {
            @apply ml-3 mt-2;
          }
        `}
      </style>
    </>
  );
};
