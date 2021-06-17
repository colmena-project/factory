import Image from "next/image";
import Link from "next/link";
import { StateBadge } from "../general";

import { IcoDelete, IcoEdit } from "../Icon";
import { IcoAction } from "../button";

import { RowType } from "./Type";

export const RowWasteAcepted = ({ row }: { row: RowType }) => {
  return (
    <>
      <tr>
        <td>
          <p>{row.date}</p>
          {row.address}
        </td>
        <td className="desktop">
          <div className=" avatar_conteiner">
            <Image
              src="/img/profile_x1.png"
              width="40"
              height="41"
              alt="profile"
            />
            <div className="ml-2">
              <p>{row.username}</p>
              {row.username}
            </div>
          </div>
        </td>

        <td className="desktop">
          <p className="font-bold">#{row.transactionId}</p>
        </td>
        <td className="mobil">{row.wasteTypes}</td>

        <td>
          <StateBadge state={row.state} percent={row.percent} />
        </td>
        <td className="center p-2">
          <p>{row.total1}</p>
          {row.total2}
        </td>
        <td>
          <div className="group_button">
            <div className="button">
              <Link
                href={{
                  pathname: "/transaccion/[id]",
                  query: { id: row.id },
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
