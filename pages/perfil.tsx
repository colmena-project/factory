import Head from "next/head";
import authPage from "../components/secure/authPage";
import { profileApi } from "../services";
import { ParseServer } from "../lib/parse";
import { useEffect, useState } from "react";

import { Profile as ProfileUser } from "../components/profile";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";

const Profile = () => {
  const [account, setAccount] = useState(undefined);

  const getAccount = async () => {
    const currentUser = ParseServer.User.current();
    const data = await profileApi.getMyAccount(currentUser.id);
    setAccount(data);
    return data;
  };

  useEffect(() => {
    getAccount();
  }, []);

  const dataBreadcrumbs = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Perfil",
    },
  ];

  return (
    <>
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container_row">
        <Breadcrumbs data={dataBreadcrumbs} />
        <ProfileUser account={account} />
      </div>

      <style jsx>
        {`
          .container_row {
            @apply mx-2;
          }
        `}
      </style>
    </>
  );
};

export default authPage(Profile);
