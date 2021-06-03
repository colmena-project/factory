import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";
import useUser from "../../hooks/useUser";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
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

  useEffect(() => {
    console.log({ isAuth });
    if (isAuth) {
      router.replace("/home");
    }
  }, [isAuth]);

  return (
    <>
      {isLoginLoading && (
        <div className="form">
          <strong>Controlando las credenciales...</strong>
        </div>
      )}
      {isAuth && (
        <div className="form">
          <strong>Redireccionando...</strong>
        </div>
      )}
      {!isLoginLoading && !isAuth && (
        <div className="page">
          <div className="container">
            <div className="inner">
              <div className="logo">
                <Image
                  src="/img/logo.png"
                  className="logo_image"
                  alt="Logo"
                  width="213"
                  height="46"
                />
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitHandler}
              >
                <Form>
                  <div className="form-control">
                    <label>Usuario</label>
                    <Field id="username" type="text" name="username" />
                    <ErrorMessage name="username">
                      {(msg) => <span className="error">{msg}</span>}
                    </ErrorMessage>
                  </div>

                  <div className="form-control">
                    <label>Contraseña</label>
                    <Field id="password" type="password" name="password" />
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
                      <button
                        type="submit"
                        className=" bg-green-400 focus:border focus:border-solid focus:border-green-200 text-white font-bold py-2 px-4 rounded"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                    <div className="box_item">
                      <a
                        className="w-full text-center no-underline inline-block align-baseline font-bold xs:text-sm text-xs text-blue hover:text-blue-dark float-right"
                        href="#"
                      >
                        Recuperar Contraseña?
                      </a>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .page {
            @apply bg-gray-200 h-screen w-screen font-sans;
          }
          .container {
            @apply flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0 m-auto;
          }
          .inner {
            @apply sm:w-3/4 lg:w-1/2;
          }
          .logo {
            @apply flex items-center justify-center mb-6;
          }
          .logo_image {
            @apply w-1/2;
          }

          :global(form),
          .form {
            @apply border-green-400 p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg;
          }

          .form-control {
            @apply mb-4;
          }

          label {
            @apply font-bold text-gray-800 block mb-2;
          }

          :global(input) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-2 py-2 rounded shadow;
            @apply hover:border-green-400 focus:border-green-400 focus:ring-green-500 focus:outline-none focus:ring-2;
          }

          .error {
            @apply text-red-700 mt-1 text-xs;
          }

          .box {
            @apply flex items-center justify-between;
          }

          .box_item {
            @apply w-1/2;
          }
        `}
      </style>
    </>
  );
};

export default Login;
