import Head from "next/head";
import Header from "../../components/layout/Header";
import { TransaccionEdit as Transaccion } from "../../components/transaccion";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";

import authPage from "../../components/secure/authPage";
import { useState } from "react";
const TransaccionEdit = () => {
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

      <Breadcrumbs data={dataBreadcrumbs} />
      <Transaccion />
    </>
  );
};

export default authPage(TransaccionEdit);
