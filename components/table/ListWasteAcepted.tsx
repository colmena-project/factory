import { RowWasteAcepted } from "./rowWasteAccepted";
import { data } from "../../data/dummy";
import { RowType } from "./Type";
export const ListWasteAcepted = () => {
  return (
    <>
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
          {data && data.map((row) => <RowWasteAcepted row={row} />)}
        </tbody>
      </table>
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
