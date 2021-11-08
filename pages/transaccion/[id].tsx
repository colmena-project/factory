import Head from "next/head";
import { useRouter } from "next/router";

import Header from "../../components/layout/Header";
import { TransaccionEdit as Transaccion } from "../../components/transaccion";
import { Breadcrumbs } from "../../components/layout/Breadcrumbs";

import authPage from "../../components/secure/authPage";
import { useEffect, useState } from "react";
import { transactionApi } from "../../services/model/transactionApi";
import { LoadingType } from "../../type";
import { Spinner } from "../../components/general";
const TransaccionEdit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [transactionId, setTransactionId] = useState(undefined);
  const [traking, setTraking] = useState("");

  const [loading, setLoading] = useState<LoadingType>("loading");

  const getTransactionDetail = async () => {
    const transactionId = Array.isArray(id) ? id[0] : id;
    setTransactionId(transactionId);

    const find = { objectId: transactionId };
    const { results } = await transactionApi.findBy(find, 1, 0);
    setTraking(results[0].get("trackingCode"));
    setLoading("iddle");
  };

  useEffect(() => {
    id && getTransactionDetail();
  }, [id]);

  const dataBreadcrumbs = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Transacción",
      href: `/transaccion/${transactionId}`,
    },
    {
      name: `#${traking}`,
    },
  ];
  return (
    <>
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading === "loading" ? (
        <Spinner />
      ) : (
        <>
          <Breadcrumbs data={dataBreadcrumbs} />
          <Transaccion transactionId={transactionId} />
        </>
      )}
    </>
  );
};

export default authPage(TransaccionEdit);
