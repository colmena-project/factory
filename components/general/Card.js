import React from 'react';
// import style from './Card.style.css';

const Card = props => {

  const { data } = props;

  const handleCancelPress = () => {
    console.log('CANCEL');
  };

  const handleCartPress = () => {
    console.log('CART');
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <p style={styles.title}>{data.wasteTypes}</p>
        <div style={styles.btnContainer}>
          <img className="" onClick={handleCancelPress} style={styles.btn} src="/icons/cancel.png" alt="" />
          <img className="" onClick={handleCartPress} style={styles.btn} src="/icons/cart.png" alt="" />
        </div>
      </div>
      <p className="py-3">{data.address}</p>
      <div style={styles.userInfo}>
        <img style={styles.avatar} src={data.avatar} alt="" />
        <div style={styles.userInfoText}>
          <p>{data.name} @{data.username}</p>
          {data.date}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 400,
    padding: 10,
    justifyContent: 'space-between',
    boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 70,
  },
  btn: {
    width: 30,
    height: 30,
    cursor: 'pointer'
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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