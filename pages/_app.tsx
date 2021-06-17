import "../styles/tailwind.css";
import { AppProps } from "next/app";

import { UserProvider } from "../context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
