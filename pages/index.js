import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Selection from '../components/Selection';
import Basket from '../components/Basket';
import ComposeModal from '../components/ComposeModal';
import Button from '@material-ui/core/Button';
import { pizzas, toppings } from '../data/pizza';
import _ from 'lodash';

const Home = ({ pizzas, toppings }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [targetPizza, setTargetPizza] = useState({});
  const [pizzaInBasket, setPizzaInBasket] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = pizzaInBasket.reduce((accumulator, value) => {
      return accumulator + value.totalPrice;
    }, 0);
    setTotal(totalPrice);
  }, [pizzaInBasket]);

  const handleBasketAddition = (newPizza) => {
    for (var i = 0; i < pizzaInBasket.length; i++) {
      if (_.isEqual(pizzaInBasket[i], newPizza)) {
        pizzaInBasket[i].count += 1;
        return;
      }
    }
    setPizzaInBasket(prevPizza => [...prevPizza, newPizza]);
  };

  const handleBasketDeletion = (index) => {
    console.log(index);
    const pizzaToKeep = pizzaInBasket.slice();
    const pizzaToRemove = pizzaToKeep.splice(index, 1);
    setPizzaInBasket(pizzaToKeep);
  };

  const handleCheckout = () => {
    window.alert('Proceed to payment page');
    setPizzaInBasket([]);
  };

  return (
    <div className={styles.container}>
      {modalStatus &&
      <ComposeModal
        setModalStatus={setModalStatus}
        body={<Selection
          handleBasketAddition={handleBasketAddition}
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
                  Choose
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <Basket
        pizzaInBasket={pizzaInBasket}
        handleBasketDeletion={handleBasketDeletion}
        total={total}
        handleCheckout={handleCheckout}/>
    </div>
  );
};

export const getStaticProps = async (context) => {
  return {
    props: { pizzas, toppings }
  };
};

export default Home;