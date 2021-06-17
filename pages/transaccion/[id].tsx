import Head from "next/head";
import Header from "../../components/layout/Header";
import { TransaccionEdit as Transaccion } from "../../components/transaccion";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";

import authPage from "../../components/secure/authPage";
import { useState } from "react";
const TransaccionEdit = () => {
  const [filter, setFilter] = useState<string>("");
  const dataBreadcrumbs = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Transacción",
      href: "/transaccion/405680",
    },
    {
      name: "#405680",
    },
  ];
  return (
    <>
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header filter={filter} setFilter={setFilter} />

      <main className="container">
        <Breadcrumbs data={dataBreadcrumbs} />
        <Transaccion />
      </main>
      <style jsx>
        {`
          .container {
            @apply mx-auto p-2;
          }
        `}
      </style>
    </>
  );
};

export default authPage(TransaccionEdit);
