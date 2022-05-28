import "../styles/tailwind.css";
import { AppProps } from "next/app";

import { UserProvider } from "../context/userContext";
import { Layout } from "../components/layout/Layout";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [filter, setFilter] = useState<string>("");
  return (
    <UserProvider>
      <Layout filter={filter} setFilter={setFilter}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
