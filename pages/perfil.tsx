import Head from "next/head";
import Header from "../components/layout/Header";

import authPage from "../components/secure/authPage";
import { useState } from "react";

import { Profile as ProfileUser } from "../components/profile";

const Profile = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <>
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header filter={filter} setFilter={setFilter} />

      <main className="container">
        <div className="container_row">
          <ProfileUser />
        </div>
      </main>
      <style jsx>
        {`
          .container {
            @apply mx-auto;
          }
          .container_row {
            @apply mx-2;
          }
        `}
      </style>
    </>
  );
};

export default authPage(Profile);
