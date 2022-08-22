import Head from "next/head";
import { useRouter } from "next/router";

import { Breadcrumbs } from "../../components/layout/Breadcrumbs";

import authPage from "../../components/secure/authPage";
import { useEffect, useState } from "react";
import { transactionApi } from "../../services/model/transactionApi";
import { LoadingType } from "../../type";
import { Spinner } from "../../components/general";

const ReportMaterial = () => {
  const router = useRouter();

  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);

  const [loading, setLoading] = useState<LoadingType>("iddle");

  const getTransactionDetail = async () => {
    setLoading("loading");
    setLoading("iddle");
  };

  useEffect(() => {
    getTransactionDetail();
  }, [dateFrom, dateTo]);

  const dataBreadcrumbs = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Reporte",
      href: `/report/material`,
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
          <div className="title">
            <h1>Reporte de Material</h1>
          </div>
          <div className="buttons">
            <div>
              <h2>Desde</h2>
              <input type="date" />
            </div>
            <div>
              <h2>Hasta</h2>
              <input type="date" />
            </div>
            <div>
              <button>Generar</button>
            </div>
          </div>
          <style jsx>
            {`
              .title {
                @apply w-screen text-lg text-colmena h-16 px-4 py-2 flex items-center justify-center;
              }
              .buttons {
                @apply flex flex-row mt-0;
              }
              .buttons div {
                @apply w-20 md:w-auto flex flex-row mt-0;
              }

              .buttons div input {
                @apply mr-1;
              }
              .buttons div button {
                @apply mr-1;
              }
            `}
          </style>
        </>
      )}
    </>
  );
};

export default authPage(ReportMaterial);
