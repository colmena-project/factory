import { RowWasteAcepted } from "./rowWasteAccepted";
import Parse from "parse";
import { data } from "../../data/dummy";
import { RowType } from "./Type";
import { useEffect, useState } from "react";
import { transactionApi } from "../../services/model/transactionApi";
import { LoadingType } from "../../type";
import { Spinner } from "../general";
export const ListWasteAcepted = ({
  recyclingCenter,
}: {
  recyclingCenter: Parse.Object | undefined;
}) => {
  const [listWasted, setListWasted] = useState<undefined | Parse.Object[]>(
    undefined
  );

  const [loading, setLoading] = useState<LoadingType>("loading");

  const [subscription, SetSubscription] = useState(undefined);

  const listeningChange = async () => {
    subscription.on("leave", (object) => {
      const incomingsTransactions = Array();
      listWasted.forEach((element) => {
        if (element.id !== object.id) {
          incomingsTransactions.push(element);
        }
      });
      setListWasted(incomingsTransactions);
    });

    subscription.on("enter", (object) => {
      setListWasted((actualCount) => [...actualCount, object]);
    });

    subscription.on("enter", (object) => {
      setListWasted((actualCount) => [...actualCount, object]);
    });

    subscription.on("create", (object) => {
      !object.get("expiredAt") &&
        setListWasted((actualCount) => [...actualCount, object]);
    });
  };

  const getListWastedAccept = async () => {
    if (recyclingCenter && !recyclingCenter.value) {
      const [firstFactory] = recyclingCenter;
      const { subscription, result } =
        await transactionApi.getAlltransactionAccept(firstFactory.id);
      setListWasted(result);
      SetSubscription(subscription);
    }
    setLoading("iddle");
  };

  useEffect(() => {
    recyclingCenter && getListWastedAccept();
  }, [recyclingCenter]);

  useEffect(() => {
    subscription && listeningChange();
  }, [subscription]);

  return (
    <>
      {loading === "loading" ? (
        <Spinner />
      ) : (
        <table className="">
          <thead>
            <tr>
              <th className="with_2_12">Pedido</th>
              <th className="with_2_12 desktop">Usuario</th>
              <th className="with_2_12 mobil">Producto</th>
              <th className="with_2_12 desktop">Transacción</th>
              <th className="with_state">Estado</th>
              <th className="with_2_12">Total</th>
              <th className="with_action">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listWasted &&
              listWasted.map((row) => <RowWasteAcepted transaction={row} />)}
          </tbody>
        </table>
      )}
      <style jsx>
        {`
          table {
            @apply table-fixed w-full;
          }

          thead {
            background-color: #eeeeee;
          }
          th {
            @apply lg:text-sm text-xs overflow-clip font-normal content-center text-center object-center;
          }
          .with_action {
            @apply w-2/12 md:w-1/12 p-3 content-center text-center object-center overflow-ellipsis overflow-hidden;
          }
          .mobil {
            @apply visible	 sm:hidden;
          }
          .desktop {
            @apply hidden	 sm:table-cell;
          }
          .with_2_12 {
            @apply w-2/12 p-2 content-center text-center object-center;
          }
          .with_state {
            @apply lg:w-3/12 md:w-2/12 w-3/12 p-2 content-center text-center object-center;
          }
        `}
      </style>
    </>
  );
};
