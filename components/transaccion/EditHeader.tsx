import { useEffect, useState } from "react";
import { dateFormat } from "../../lib/dateFormat";
import { Spinner } from "../general";
import { IcoArrow } from "../Icon";
export const TransaccionEditHeader = ({ transaction, pagado }) => {
  const [account, setAccount] = useState(undefined);

  const getAccount = async () => {
    const accountData = await transaction.fromAddress.account.fetch();
    setAccount(accountData);
  };

  useEffect(() => {
    transaction && getAccount();
  }, [transaction]);

  return (
    <>
      {transaction && (
        <div className="operacion_header">
          <div className="operacion_header_from_to">
            <div className="operacion_header_from">
              <div className="operacion_header_from_name">
                {account &&
                  `${account.get("firstName")} ${account.get("lastName")}`}
              </div>
              <div className="operacion_header_from_address">
                {transaction.fromAddress.description}
              </div>
              <div className="operacion_header_from_location">
                {transaction.fromAddress.city}
              </div>
            </div>
            <div className="operacion_header_link">
              <div className="operacion_header_link_conteiner">
                <IcoArrow />
              </div>
            </div>
            <div className="operacion_header_to">
              <div className="operacion_header_from_name">Transportado a</div>
              <div className="operacion_header_from_location">
                {transaction.recyclingCenter.get("name")}
              </div>
              <div className="operacion_header_from_address">
                {transaction.recyclingCenter.get("description")}
              </div>
            </div>
          </div>
          <div className="operacion_header_status">
            <div className="operacion_header_status_item">
              <strong>Fecha:</strong>
              {dateFormat(new Date(transaction.fromAddress.createdAt))}
            </div>
            <div className="operacion_header_status_status">
              <strong>Estado:</strong>
              {pagado ? (
                <div className="label_pagado">Pagado</div>
              ) : (
                <div className="label">Sin pagar</div>
              )}
            </div>
            <div className="operacion_header_status_item">
              <strong>Tracking :</strong># {transaction.trackingCode}
            </div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .operacion_header {
            @apply w-full mt-3 mb-4 px-0 flex flex-row justify-between text-xs;
          }

          .operacion_header_from_to {
            @apply w-4/6 md:w-3/6 flex flex-row;
          }

          .operacion_header_status {
            @apply w-2/6 md:w-1/6;
          }

          .operacion_header_link {
            @apply w-7 mx-7 flex items-center justify-center;
          }
          .operacion_header_from,
          .operacion_header_to {
            @apply w-1/3;
          }

          .operacion_header_from_name {
            @apply text-sm md:text-lg;
          }
          .operacion_header_from_location,
          .operacion_header_from_address {
            @apply text-xs md:text-sm;
          }

          .operacion_header_status_status,
          .operacion_header_single,
          .operacion_header_total {
            @apply flex flex-row my-2;
          }

          .operacion_header_status_item strong {
            @apply mr-2;
          }
          .label {
            @apply ml-2 rounded px-2  bg-gray-300;
          }
          .label_pagado {
            @apply ml-2 rounded px-2  text-white bg-colmena;
          }
        `}
      </style>
    </>
  );
};
