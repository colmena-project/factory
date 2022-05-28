import Head from "next/head";
import Card from "../components/incomingTransaccion/Card";
import { ListWasteAcepted } from "../components/table/ListWasteAcepted";

import authPage from "../components/secure/authPage";
import { useContext, useEffect, useState } from "react";
import { transactionApi } from "../services/model/transactionApi";
import Context from "../context/userContext";
import { LoadingType } from "../type";
import { Spinner } from "../components/general";

const Home = () => {
  const { factory } = useContext(Context);
  const [incomingTransaction, setIncomingTransaction] = useState(undefined);
  const [subscription, SetSubscription] = useState(undefined);

  const [loading, setLoading] = useState<LoadingType>("loading");

  const listeningChange = async () => {
    subscription.on("leave", (object) => {
      const incomingsTransactions = Array();
      incomingTransaction.forEach((element) => {
        if (element.id !== object.id) {
          incomingsTransactions.push(element);
        }
      });
      console.log("leave", object, incomingsTransactions);
      setIncomingTransaction(incomingsTransactions);
    });

    subscription.on("enter", (object) => {
      console.log("enter", object);
      !object.get("expiredAt") &&
        setIncomingTransaction((actualCount) => [...actualCount, object]);
    });
  };

  const findTransaction = async () => {
    if (factory && !factory.value) {
      const [firstFactory] = factory;
      const { subscription, result } = await transactionApi.getAlltransaction(
        firstFactory.id
      );
      setIncomingTransaction(result);
      SetSubscription(subscription);
    } else {
      setIncomingTransaction(undefined);
    }

    setLoading("iddle");
  };

  useEffect(() => {
    findTransaction();
  }, [factory]);

  useEffect(() => {
    subscription && listeningChange();
  }, [subscription]);

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
          <div className="container_row">
            <div className="conteiner_row_input">
              <div className="mt-4 ml-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    className="text-colmena"
                  />
                  <span className="pl-5">Ver sólo pendientes</span>
                </label>
              </div>
            </div>
            <div className="container_row_left">
              <ListWasteAcepted recyclingCenter={factory} />
            </div>

            <div className="container_row_right">
              {incomingTransaction &&
                incomingTransaction.map((transaction) => {
                  return (
                    <Card key={transaction.id} transaction={transaction} />
                  );
                })}
            </div>
          </div>
        </>
      )}

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
