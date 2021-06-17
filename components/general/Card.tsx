import React from "react";
import Image from "next/image";
import { IcoAction } from "../button";

const Card = (props) => {
  const { data } = props;

  const handleCancelPress = () => {
    console.log("CANCEL");
  };

  const handleCartPress = () => {
    console.log("CART");
  };

  return (
    <>
      <div className="card">
        <div className="card_header">
          <p className="title">{data.wasteTypes}</p>
          <div style={styles.btnContainer}>
            <div>
              <IcoAction onClick={handleCancelPress}>
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

        <p className="py-3">{data.address}</p>
        <div style={styles.userInfo}>
          <img style={styles.avatar} src={data.avatar} alt="" />
          <div style={styles.userInfoText}>
            <p>
              {data.name} @{data.username}
            </p>
            {data.date}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            @apply flex flex-col w-full p-5 justify-between shadow-lg mb-5 text-xs;
          }

          .card_header {
            @apply flex justify-between;
          }
          .title {
            @apply font-bold text-sm;
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
