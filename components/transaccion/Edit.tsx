import { TransaccionEditHeader } from "./EditHeader";
import { IcoDelete, IcoEdit } from "../Icon";
import { IcoAction } from "../button";
import { Button } from "../button";
import { useEffect, useState } from "react";

export const TransaccionEdit = () => {
  const initialValue = [
    { position: 0, total: 0 },
    { position: 1, total: 0 },
  ];
  const [values, setValues] = useState(initialValue);
  const [total, setTotal] = useState<number>(0);

  const handleChangeInput = (event) => {
    const _values = [...values];
    _values[+event.target.dataset.id] = {
      position: +event.target.dataset.id,
      total: +event.target.value,
    };
    setValues(_values);
  };

  useEffect(() => {
    let totalCal = 0;
    values.map((object) => {
      totalCal += object.total;
    });
    setTotal(totalCal);
  }, [values]);

  return (
    <>
      <div className="container_row">
        <div className="operation">Operación</div>
        <TransaccionEditHeader />
        <div className="operacion_detail">
          <table className="table-wasted">
            <thead>
              <tr>
                <th className="th_font th_1_12 desktop">Pedido</th>
                <th className="th_font th_1_12 mobile ">Tras</th>
                <th className="th_font th_2_12 truncate">Contenido</th>
                <th className="th_font th_3_12_origen truncate">Origen</th>
                <th className="th_font th_3_12_count truncate">Cantidad</th>
                <th className="th_font th_2_12_dist truncate">Distribución</th>
                <th className="th_font th_1_12"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mobile tuncate_left">#00000001117</td>
                <td className="mobile">PET 10, ORG 10</td>
                <td className="desktop_table">#1</td>
                <td className="desktop_table flex-wrap">
                  <div className="font-bold">#00000001117</div>
                  <div className=" ">PET 10, ORG 10</div>
                </td>
                <td>
                  <div className="break-words font-bold">
                    Fernando Hillebrand
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    data-id="0"
                    onChange={handleChangeInput}
                  />
                </td>
                <td>
                  <div>E. $29,192</div>
                  <div>R. $28,192</div>
                </td>
                <td>
                  <div className="flex flex-grow">
                    <div className="ico_action">
                      <IcoAction>
                        <IcoEdit />
                      </IcoAction>
                    </div>
                    <div className="ico_action">
                      <IcoAction>
                        <IcoDelete />
                      </IcoAction>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="mobile tuncate_left">#00000001118</td>
                <td className="mobile">PET 10, ORG 10</td>
                <td className="desktop_table">#2</td>
                <td className="desktop_table flex-wrap">
                  <div className="font-bold">#00000001118</div>
                  <div className=" ">PET 10, ORG 10</div>
                </td>
                <td>
                  <div className="break-words font-bold">Ivan Zuwilewitz</div>
                </td>
                <td>
                  <input
                    type="number"
                    data-id="1"
                    onChange={handleChangeInput}
                  />
                </td>
                <td>
                  <div>E. $29,192</div>
                  <div>R. $28,192</div>
                </td>
                <td>
                  <div className="flex flex-grow">
                    <div className="ico_action">
                      <IcoAction>
                        <IcoEdit />
                      </IcoAction>
                    </div>
                    <div className="ico_action">
                      <IcoAction>
                        <IcoDelete />
                      </IcoAction>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="operacion_end">
          <div className="operacion_end_payment">
            <div className="operacion_end_payment_text">
              <strong className="desktop">Total Transporte</strong>
              <strong className="mobile">E</strong>
              <div className="flex">2939.0</div>
            </div>
            <div className="operacion_end_payment_text">
              <strong className="desktop">Total Redistribucion</strong>
              <strong className="mobile">E</strong>
              <div>2939.0</div>
            </div>
            <div className="operacion_end_payment_button">
              <Button typeButton="button">Pagar</Button>
            </div>
          </div>
          <div className="operacion_end_total">
            <input type="number" disabled={true} value={total} />
            <div className="operacion_end_total_text">
              Cantidad Total en KG.
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container_row {
            @apply flex flex-col w-full text-xs;
          }
          .operation {
            @apply font-bold text-base w-full px-0 my-2 pt-3;
          }

          .operacion_detail {
            @apply w-full;
          }

          .tuncate_left {
            @apply truncate px-2;
            direction: rtl;
          }

          .table-wasted {
            @apply w-full table-fixed;
          }

          .th_1_12 {
            @apply w-1/12;
          }
          .th_2_12 {
            @apply w-1/12 md:w-2/12;
          }
          .th_3_12 {
            @applyw-2 /12 md:w-3/12;
          }
          .th_3_12_origen {
            @apply w-1/12 md:w-3/12;
          }
          .th_3_12_count {
            @apply w-1/12 md:w-3/12;
          }
          .th_2_12_dist {
            @apply w-1/12 md:w-2/12;
          }
          .th_font {
            @apply font-normal text-left;
          }

          td {
            @apply border-gray-200 border-t-2 py-2;
          }

          .operacion_end {
            @apply w-full flex flex-row-reverse my-2 px-2;
          }

          .operacion_end_total {
            @apply w-3/12;
          }
          .operacion_end_payment {
            @apply w-3/12;
          }

          .operacion_end_payment_text {
            @apply my-2 flex flex-wrap;
          }

          .operacion_end_payment_text strong {
            @apply mr-2;
          }

          input[type="number"] {
            @apply block appearance-none w-9/12 bg-white border border-gray-200 px-1 py-1 rounded text-right;
            @apply hover:border-colmena focus:border-colmena-light focus:ring-colmena focus:outline-none focus:ring-1;
          }
          .operacion_end_total_text {
            @apply mt-2 text-right w-9/12;
          }

          .mobile {
            @apply visible md:hidden;
          }
          .desktop {
            @apply hidden	md:flex;
          }

          .desktop_table {
            @apply hidden	md:table-cell;
          }

          .operacion_end_payment_button > :global(button) {
            @apply min-w-0 w-20 md:w-40;
          }

          .ico_action > :global(button) {
            @apply w-6;
          }
        `}
      </style>
    </>
  );
};
