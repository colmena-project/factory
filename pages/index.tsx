import Head from "next/head";
import Header from "../components/layout/Header";
import Card from "../components/general/Card";
import { ListWasteAcepted } from "../components/table/ListWasteAcepted";
import { cards } from "../data/dummy";

import authPage from "../components/secure/authPage";
import { useState } from "react";

const Home = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <>
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container_row">
        <div className="conteiner_row_input">
          <div className="mt-4 ml-2">
            <label className="inline-flex items-center">
              <input type="checkbox" id="checkbox1" className="text-colmena" />
              <span className="pl-5">Ver sólo pendientes</span>
            </label>
          </div>
        </div>
        <div className="container_row_left">
          <ListWasteAcepted />
        </div>

        <div className="container_row_right">
          {cards && cards.map((cardInfo) => <Card data={cardInfo} />)}
        </div>
      </div>

      <style jsx>
        {`
          .container_row {
            @apply grid grid-cols-5 gap-4;
          }

          .conteiner_row_input {
            @apply col-span-3;
          }
          .container_row_left {
            @apply lg:col-span-4 col-span-5;
          }
          .container_row_right {
            @apply lg:col-span-1 col-span-5;
          }

          .checkbox:checked:before {
            background-color: green;
          }

          input[type="checkbox"].checkbox1 + span:after {
            content: "\f096"; /* In fontawesome, is an open square (fa-square-o) */
          }
          input[type="checkbox"]:checked {
            -moz-box-shadow: inset 0 0 10px #7bf985;
            -webkit-box-shadow: inset 0 0 10px #7bf985;
            box-shadow: inset 0 0 10px #7bf985;
          }
        `}
      </style>
    </>
  );
};

export default authPage(Home);
