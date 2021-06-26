import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import useUser from "../../hooks/useUser";
import { Spinner } from "../../components/general/Spinner";

export default function Logout() {
  const { isAuth, logout } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/auth/login");
    }
  }, [isAuth]);

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Head>
        <title>Cerrar Sesion</title>
      </Head>
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
            <div className="front">
              <div className="container">
                <div className="inner">
                  <div className="message">
                    <Spinner />
                    <strong className="message_info">
                      Cerrando la sesión del usuario
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

          :global(form) {
            @apply border-green-400 p-8 border-t-4 bg-white mb-6 rounded-lg shadow-lg w-auto h-auto static;
          }

          .front {
            @apply absolute top-0 left-0 w-full h-full bg-opacity-20 bg-green-100  backdrop-filter backdrop-blur;
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

          :global(input) {
            @apply block appearance-none w-full bg-white border border-gray-200 px-2 py-2 rounded;
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

          .message_info {
            @apply ml-3 mt-2;
          }
        `}
      </style>
    </>
  );
}
