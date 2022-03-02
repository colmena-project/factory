import { TransaccionEditHeader } from "./EditHeader";
import { IcoDelete, IcoEdit } from "../Icon";
import { IcoAction } from "../button";
import { Button } from "../button";
import { useEffect, useState } from "react";
import { transactionApi } from "../../services/model/transactionApi";
import { ContainerHistory } from "./ContainerHistory";
import { alertService } from "../../services/alert";
import { LoadingType } from "../../type";
import { Spinner } from "../general";

export const TransaccionEdit = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const [loading, setLoading] = useState<LoadingType>("loading");

  const [transactionTrasport, setTransactionTrasport] = useState(undefined);
  const [transportTotal, setTransportTotal] = useState(undefined);
  const [pagado, setPagado] = useState<boolean>(false);
  const [transaccionesPagadas, setTransaccionesPagadas] = useState(undefined);
  const [recoveryTotal, setRecoveryTotal] = useState<{
    containerId: number;
    crypto: number;
    total: number;
    item: { crypto: number; total: number }[];
  }>(undefined);

  const getTransactionDetail = async () => {
    const detail = await transactionApi.getContainerByTransaction(
      transactionId
    );

    setTransactionTrasport(detail);

    const transacctionConfirm = [];
    let total = 0;
    let crypto = 0;
    let itemComplete: { crypto: number; total: number }[] = [];

    detail.container.forEach((element) => {
      const transactionComplete = element.history.filter(
        (element) => element.type === "COMPLETE"
      );

      if (transactionComplete) {
        let totalTransaction = 0;
        let cryptoTransaction = 0;

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
                  totalTransaction += elementRetribution.confirmed;
                }
              }
            });

          //Search and sum the total payment
          trans.paymentTransaction &&
            trans.paymentTransaction.forEach((elementPayment) => {
              if (elementPayment.type === "MATERIAL") {
                cryptoTransaction = elementPayment.amount;
              }
            });

          //add The transaction Complete
          transacctionConfirm.push({
            conterner: element.containerId,
            transaction: trans,
          });

          itemComplete.push({
            crypto: cryptoTransaction,
            total: totalTransaction,
          });

          total += totalTransaction;
          crypto += cryptoTransaction;
        });

        //set the Total Material
        setRecoveryTotal({
          containerId: element.containerId,
          total: total,
          crypto: crypto,
          item: itemComplete,
        });
      }
    });

    setTransaccionesPagadas(transacctionConfirm);

    setPagado(transacctionConfirm.length === detail.container.length);

    setLoading("iddle");
  };

  const paymentHandler = async () => {
    console.log(recoveryTotal);
    const container: { container: string; total: number; payment: number }[] =
      new Array();
    Object.entries(recoveryTotal.item).forEach(([key, element]) => {
      container.push({
        container: key,
        total: element.total,
        payment: element.crypto,
      });
    });

    try {
      setPagado(true);
      setLoading("loading");
      await transactionApi.registerPayment(transactionId, container);
      setLoading("iddle");
      alertService.success(`La transacción fue pagada con exito`, {
        keepAfterRouteChange: true,
        modal: true,
      });
    } catch (e) {
      setPagado(false);
      setLoading("iddle");
      alertService.error(`${e}`, {
        keepAfterRouteChange: true,
        modal: true,
      });
    }
  };

  useEffect(() => {
    transactionId && getTransactionDetail();
  }, [transactionId]);

  return (
    <>
      <div className="container_row">
        <TransaccionEditHeader
          pagado={pagado}
          transaction={transactionTrasport}
        />
        <div className="operacion_detail">
          <table className="table-wasted">
            <thead>
              <tr>
                <th className="th_font th_1_12">Pedido</th>
                <th className="th_font th_1_12">Contenedor</th>
                <th className="th_font th_2_12">Recovery</th>
                <th className="th_font th_2_12">KG</th>
                <th className="th_font th_1_12">Pago (KG)</th>
                <th className="th_font th_1_12">KM</th>
                <th className="th_font th_1_12">Pago (KM)</th>
                <th className="th_font th_1_12"></th>
              </tr>
            </thead>
            <tbody>
              {transactionTrasport &&
                transactionTrasport.container.map((element, index) => {
                  return (
                    <ContainerHistory
                      key={index}
                      container={element}
                      number={index + 1}
                      setTransportTotal={setTransportTotal}
                      setRecoveryTotal={setRecoveryTotal}
                      disabled={pagado}
                      recoveryTotal={recoveryTotal}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="operacion_end">
          {loading === "loading" ? (
            <Spinner />
          ) : (
            <>
              <div className="operacion_end_total">
                <div className="element">
                  <div>Total por Material</div>
                  {recoveryTotal && (
                    <>
                      <div className="element_partial">
                        {recoveryTotal.total} KG
                      </div>
                      <div className="element_total">
                        {recoveryTotal.crypto} jyc
                      </div>
                    </>
                  )}
                </div>
                <div className="element">
                  <div>Total por Transporte</div>
                  {transportTotal && (
                    <>
                      <div className="element_partial">
                        {transportTotal.total} KM
                      </div>
                      <div className="element_total">
                        {transportTotal.crypto.toFixed(4)} jyc
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="operacion_end_action">
                <div>
                  {/* <Button disabled={pagado} typeButton="button">
                  Guardar
                </Button> */}
                </div>

                <div>
                  <Button
                    disabled={pagado}
                    typeButton="button"
                    onClick={paymentHandler}
                  >
                    Finalizar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .container_row {
            @apply flex flex-col w-full text-xs;
          }

          .operacion_detail {
            @apply w-full;
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

          .th_font {
            @apply font-normal text-left;
          }

          .operacion_end {
            @apply w-full flex flex-col  my-2 px-2;
          }

          .operacion_end_total {
            @apply w-full flex flex-row items-start justify-end h-32;
          }

          .operacion_end_total .element {
            @apply w-2/12 mr-9 mt-2;
          }

          .operacion_end_total .element div {
            @apply w-full text-center;
          }
          .element_partial {
            @apply text-lg;
          }

          .element_total {
            @apply text-2xl;
          }

          .operacion_end_action {
            @apply w-full flex flex-row items-center justify-center;
          }

          .operacion_end_action div {
            @apply mr-6;
          }

          .operacion_end_action div {
            @apply mr-3;
          }
        `}
      </style>
    </>
  );
};
