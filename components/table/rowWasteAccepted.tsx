import Image from "next/image";
import Link from "next/link";
import { StateBadge } from "../general";

import { IcoDelete, IcoEdit } from "../Icon";
import { IcoAction } from "../button";

import Parse from "parse";
import { useEffect, useState } from "react";
import { transactionApi } from "../../services/model/transactionApi";
import { profileApi } from "../../services";
import { CONTAINER_STATUS, WASTED_CONTAINER_STATUS } from "../../lib/constants";

export const RowWasteAcepted = ({
  transaction,
}: {
  transaction: Parse.Object;
}) => {
  const [transacionDetail, setTransacionDetail] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [totalEstimated, setTotalEstimated] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [stated, setStated] = useState(WASTED_CONTAINER_STATUS.IN_PROGRESS);
  const [percent, setPercent] = useState<number>(0);

  const getTransactionDetail = async () => {
    const details = await transactionApi.getContainerByTransaction(
      transaction.id
    );

    let estimated = 0;
    let retrive = 0;
    details.container.forEach((element) => {
      const transactionComplete = element.history.filter(
        (element) => element.type === "COMPLETE"
      );

      if (transactionComplete) {
        setPercent(100);

        setStated(WASTED_CONTAINER_STATUS.PAID);

        transactionComplete.forEach((trans) => {
          //Search and sum the total weight
          trans.retributionConfirm &&
            trans.retributionConfirm.forEach((elementRetribution) => {
              const transSearch = element.history.filter(
                (element) =>
                  element.objectId === elementRetribution.transaction.id
              );

              if (transSearch) {
                if (transSearch[0].type === "RECOVER") {
                  retrive += elementRetribution.confirmed;
                  estimated += elementRetribution.estimated;
                }
                if (transSearch[0].type === "TRANSPORT") {
                  retrive += transSearch[0].retribution.confirmed;
                  estimated += transSearch[0].retribution.estimated;
                }
              }
            });
        });
      } else {
        setPercent(0);
      }
    });
    setTotalEstimated(estimated);
    setTotalConfirmed(retrive);

    setTransacionDetail(details);

    const userObject = await profileApi.getAccountByUserId(details.from.id);
    setUser(userObject);
  };

  useEffect(() => {
    getTransactionDetail();
  }, []);

  const dateCreated = [
    ("0" + transaction.get("createdAt").getDate()).slice(-2),
    ("0" + (transaction.get("createdAt").getMonth() + 1)).slice(-2),
    transaction.get("createdAt").getFullYear(),
  ].join("-");

  return (
    <>
      {user && transacionDetail && (
        <tr key={transaction.id}>
          <td>
            <p>{dateCreated}</p>
            {transaction.get("fromAddress").description}
          </td>
          <td className="desktop">
            <div className=" avatar_conteiner">
              <Image
                src={
                  user.get("avatar")
                    ? user.get("avatar")
                    : "/img/user-default.png"
                }
                alt="search"
                width="24"
                height="24"
              />
              <div className="ml-2">
                <p>
                  {user.get("firstName")} {user.get("lastName")}
                </p>
              </div>
            </div>
          </td>

          <td className="desktop">
            <p className="font-bold">
              #{transaction.get("trackingCode") + " "}
              {transacionDetail.details.map((element) => {
                if (element.container) {
                  return `${element.container.get("code")} `;
                }
              })}
            </p>
          </td>
          <td className="mobil">
            <p className="font-bold">#{transaction.get("trackingCode")}</p>
          </td>

          <td>
            <StateBadge state={stated} percent={percent} />
          </td>
          <td className="center p-2">
            <p>E: {totalEstimated}</p>
            <p>R: {totalConfirmed}</p>
          </td>
          <td>
            <div className="group_button">
              <div className="button">
                <Link
                  href={{
                    pathname: "/transaccion/[id]",
                    query: { id: transaction.id },
                  }}
                >
                  <a>
                    <IcoAction>
                      <IcoEdit />
                    </IcoAction>
                  </a>
                </Link>
              </div>
              <div className="button ml-1">
                <a href="">
                  <IcoAction>
                    <IcoDelete />
                  </IcoAction>
                </a>
              </div>
            </div>
          </td>
        </tr>
      )}
      <style jsx>
        {`
          tr {
            border-top-width: 1;
            border-top-color: "#eeeeee";
            @apply text-xs sm:text-sm;
          }
          td:first-child {
            @apply px-4 py-2;
          }
          td {
            @apply px-2 py-1;
          }
          .center {
            @apply text-center;
          }
          .group_button {
            @apply flex flex-row;
          }

          .avatar_conteiner {
            @apply flex justify-start items-center;
          }

          .button {
            @apply w-auto p-0 m-0;
          }
          .button > :global(button) {
            width: 18px;
          }

          .mobil {
            @apply visible sm:hidden;
          }
          .desktop {
            @apply hidden	sm:table-cell;
          }
        `}
      </style>
    </>
  );
};
