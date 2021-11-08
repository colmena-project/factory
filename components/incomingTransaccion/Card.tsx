import React, { useEffect, useState } from "react";
import Parse from "parse";
import Image from "next/image";
import { IcoAction } from "../button";
import { transactionApi } from "../../services/model/transactionApi";
import { profileApi } from "../../services";
import { Spinner } from "../general";
import { alertService } from "../../services/alert";
import Modal from "../general/Modal";
import { dateFormat } from "../../lib/dateFormat";

const Card = ({ transaction }) => {
  const [transacionDetail, setTransacionDetail] = useState(undefined);
  const [user, setUser] = useState<Parse.Object | undefined>(undefined);
  const [reject, setReject] = useState<boolean>(false);

  const getTransactionDetail = async () => {
    const details = await transactionApi.getTransactionDetail(transaction.id);
    const userObject: Parse.Object = await profileApi.getAccountByUserId(
      details.from.id
    );

    setTransacionDetail(details);
    setUser(userObject);
  };

  useEffect(() => {
    getTransactionDetail();
  }, []);

  const closeModal = () => {
    setReject(false);
  };

  const openModal = () => {
    setReject(true);
  };

  const handleCancelPress = async (reason: string) => {
    await transactionApi.registerTransportReject(transaction.id, reason);
    alertService.success(
      `La transacción con traking #${transaction.get(
        "trackingCode"
      )} fue rechazada`,
      {
        keepAfterRouteChange: true,
        modal: true,
      }
    );
  };

  const handleCartPress = async () => {
    await transactionApi.registerTransportAccept(transaction.id);
    alertService.success(
      `La transacción con traking #${transaction.get(
        "trackingCode"
      )} fue aceptada`,
      {
        keepAfterRouteChange: true,
        modal: true,
      }
    );
  };

  const dateCreated = dateFormat(transaction.get("createdAt"));

  return (
    <>
      {reject && (
        <>
          {" "}
          <Modal
            title={
              "Motivo de Rechazo para el Tracking #" +
              transaction.get("trackingCode")
            }
            action={handleCancelPress}
            closeModal={closeModal}
            buttonText={"Rechazar"}
          />
        </>
      )}
      <div className="card">
        {user && transacionDetail ? (
          <>
            <div className="card_header">
              <p className="title">
                {transacionDetail.details.map((element) => {
                  if (element.container) {
                    return `${element.container.get("code")}`;
                  }
                })}
              </p>
              <div style={styles.btnContainer}>
                <div>
                  <IcoAction onClick={openModal}>
                    <Image
                      src="/icons/cancel.png"
                      alt="Cancel"
                      width="20"
                      height="20"
                      className="pointer"
                    />
                  </IcoAction>
                </div>

                <div>
                  <IcoAction onClick={handleCartPress}>
                    <Image
                      src="/icons/cart.png"
                      alt="Cancel"
                      width="20"
                      height="20"
                      className="pointer"
                    />
                  </IcoAction>
                </div>
              </div>
            </div>
            <p className="tracking">
              Traking #{transaction.get("trackingCode")}
            </p>
            <p className="py-3">
              {transaction.get("fromAddress").description} -
              {transaction.get("fromAddress").city}
            </p>
            <div style={styles.userInfo}>
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
              <div style={styles.userInfoText}>
                <p>
                  {user.get("firstName")} {user.get("lastName")}
                </p>

                {dateCreated}
              </div>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      <style jsx>
        {`
          .card {
            @apply flex flex-col w-full p-5 justify-between shadow-lg mb-5 text-xs transition duration-300 ease-in-out;
          }

          .card_header {
            @apply flex justify-between;
          }
          .title {
            @apply font-bold text-sm;
          }

          .tracking {
            @apply w-full text-sm;
          }

          .group_button {
            @apply flex flex-row;
          }
        `}
      </style>
    </>
  );
};

const styles = {
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: 70,
  },
  btn: {
    width: 30,
    height: 30,
    cursor: "pointer",
  },
  userInfo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
  },
  userInfoText: {
    paddingLeft: 10,
  },
};

export default Card;
