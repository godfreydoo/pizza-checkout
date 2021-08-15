import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Selection from '../components/Selection';
import ComposeModal from '../components/ComposeModal';
import Button from '@material-ui/core/Button';
import { pizzas, toppings } from '../data/pizza';

const Home = ({ pizzas, toppings }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [targetPizza, setTargetPizza] = useState({});
  const [pizzaInBasket, setPizzaInBasket] = useState([]);

  const handleBasketChange = (pizza) => {
    setPizzaInBasket(prevPizza => [...prevPizza, pizza]);
  };

  return (
    <div className={styles.container}>
      {modalStatus &&
      <ComposeModal
        setModalStatus={setModalStatus}
        body={<Selection
          handleBasketChange={handleBasketChange}
          toppings={toppings}
          targetPizza={targetPizza}
          setModalStatus={setModalStatus}
        />}
      />}

      <div className={styles.pizza}>
        <div className={styles.grid}>
          {pizzas.map((value, index) => {
            return (
              <div className={styles.card} key={value.id}>
                <Image src={value.photoUrl} height={350} width={400} alt={value.name} className={styles.image}/>
                <p>{value.name}</p>
                <Button
                  variant="contained"
                  onClick={() => {
                    setModalStatus(true);
                    setTargetPizza(value);
                  }}>
                  <div>Choose</div>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.basket}>
        Checkout Basket
        {pizzaInBasket.map((value, index) => {
          console.log(value);
          return (
            <div key={index}>
              <div >
                <div>{value.name}</div>
                <div>${value.totalPrice} HKD</div>
              </div>
              {value.toppings.map((value, index) => {
                if (index !== 0) {
                  return <span key={index}>{value} </span>;
                } else {
                  return <span key={index}>{value}, </span>;
                }
              })}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export const getStaticProps = async (context) => {
  return {
    props: { pizzas, toppings }
  };
};

export default Home;