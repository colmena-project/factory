import { useEffect, useState } from "react";
import { profileApi, retributionApi } from "../../services";
import { IcoAction } from "../button";
import { IcoDelete, IcoEdit } from "../Icon";
import { IcoImport } from "../Icon/IcoImport";
import Parse from "parse";
import { TRANSACTIONS_TYPES } from "../../lib/constants";
import { ModalWeight } from "./ModalWeight";
import { Material } from "../../type";

export const ContainerHistory = ({
  container,
  number,
  setTransportTotal,
  setRecoveryTotal,
  disabled,
  recoveryTotal,
}: {
  container: any;
  number: any;
  setTransportTotal: any;
  setRecoveryTotal: any;
  disabled: boolean;
  recoveryTotal?: {
    containerId: number;
    crypto: number;
    total: number;
    item: { crypto: number; total: number }[];
  };
}) => {
  const [transactionRecovery, setTransactionRecovery] = useState<
    Parse.Object | undefined
  >(undefined);
  const [transactionTransport, setTransactionTransport] = useState<
    Parse.Object | undefined
  >(undefined);
  const [account, setAccount] = useState<Parse.Object | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [wasteTypeId, setWasteTypeId] = useState<string | undefined>(undefined);
  const [modalWeight, setModalWeight] = useState<boolean>(false);
  const [retributionRecovery, setRetributionRecovery] = useState<
    number | undefined
  >(undefined);

  const getAllTransaction = async () => {
    const trasRecovery = container.history.filter(
      (element) => element.type === TRANSACTIONS_TYPES.RECOVER
    );
    setTransactionRecovery(trasRecovery[0]);
    const trasTransport = container.history.filter(
      (element) => element.type === TRANSACTIONS_TYPES.TRANSPORT
    );
    setTransactionTransport(trasTransport[0]);

    setWasteTypeId(trasRecovery[0].details[0].container.get("type").id);

    console.log(recoveryTotal);
    if (recoveryTotal) {
      setWeight(recoveryTotal.total);
      setRetributionRecovery(recoveryTotal.crypto);
    }

    setTransportTotal((prevState) =>
      prevState === undefined
        ? {
            total: trasTransport[0].kms,
            crypto: trasTransport[0].retribution.estimated,
          }
        : {
            total: trasTransport[0].kms + prevState.total,
            crypto: trasTransport[0].retribution.estimated + prevState.crypto,
          }
    );

    const accountData = await profileApi.getAccountByUserId(
      trasRecovery[0].createdBy.id
    );
    setAccount(accountData);
  };

  const handlerClickModal = () => {
    setModalWeight(!modalWeight);
  };

  const handlerClickSave = async (weight) => {
    setModalWeight(!modalWeight);
    setWeight(parseFloat(weight));

    const type: string = "material";
    const elements: Material[] = [
      {
        wasteType: wasteTypeId,
        qty: weight,
        unit: "kg",
      },
    ];

    const returnValue = await retributionApi.estimateRetribution(
      type,
      elements
    );
    setRetributionRecovery(returnValue.material.total);
    const containerName = container.containerName;
    setRecoveryTotal((prevState) => {
      console.log(prevState);
      let cryptoTemp = 0;
      let weightTemp = 0;
      if (prevState !== undefined) {
        cryptoTemp = prevState.crypto;
        weightTemp = prevState.total;
        if (prevState.item[containerName]) {
          weightTemp -= prevState.item[containerName].total;
          cryptoTemp -= prevState.item[containerName].crypto;
        }
      }
      console.log(cryptoTemp, weightTemp);

      return prevState === undefined
        ? {
            total: parseFloat(weight),
            crypto: returnValue.material.total,
            item: {
              [containerName]: {
                total: parseFloat(weight),
                crypto: returnValue.material.total,
              },
            },
          }
        : {
            total: parseFloat(weight) + weightTemp,
            crypto: returnValue.material.total + cryptoTemp,
            item: {
              ...prevState.item,
              [containerName]: {
                total: parseFloat(weight),
                crypto: returnValue.material.total,
              },
            },
          };
    });
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <>
      <tr key={number}>
        <td className="">#{number}</td>
        <td className="">{container.containerName}</td>
        <td className="">
          {account && (
            <div className="break-words font-bold">
              {`${account.get("firstName")} ${account.get("lastName")}`}
            </div>
          )}
        </td>
        <td className="flex-wrap">
          <div className="flex flex-grow">
            <div className="weight_value">{weight && weight} </div>
            <div className="ico_action">
              <IcoAction onClick={handlerClickModal} disabled={disabled}>
                <IcoImport />
              </IcoAction>
            </div>
          </div>
          {modalWeight && (
            <ModalWeight
              title={"Peso en KG"}
              handleClickClose={handlerClickModal}
              handleClickSave={handlerClickSave}
            />
          )}
        </td>
        <td>
          <div>
            {transactionRecovery &&
              `E. ${transactionRecovery.retribution.estimated} jyc`}
          </div>
          <div>{retributionRecovery && `R. ${retributionRecovery} jyc`}</div>
        </td>
        <td>{transactionTransport && transactionTransport.kms}</td>
        <td>
          <div>
            {transactionTransport &&
              `${transactionTransport.retribution.estimated.toFixed(4)} jyc`}
          </div>
        </td>
        <td>
          <div className="flex flex-grow">
            <div className="ico_action">
              <IcoAction disabled={disabled}>
                <IcoEdit />
              </IcoAction>
            </div>
            <div className="ico_action">
              <IcoAction disabled={disabled}>
                <IcoDelete />
              </IcoAction>
            </div>
          </div>
        </td>
      </tr>
      <style jsx>
        {`
          td {
            @apply border-gray-200 border-t-2 py-2;
          }

          .weight_value {
            @apply appearance-none w-8/12 bg-white border border-gray-200 px-1 py-1 rounded text-right;
            @apply hover:border-colmena focus:border-colmena-light focus:ring-colmena focus:outline-none focus:ring-1;
          }

          .ico_action > :global(button) {
            @apply mx-2;
          }
        `}
      </style>
    </>
  );
};
