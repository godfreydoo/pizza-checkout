import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Selection from '../components/Selection';
import ComposeModal from '../components/ComposeModal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { pizzas, toppings } from '../data/pizza';
import _ from 'lodash';

const Home = ({ pizzas, toppings }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [targetPizza, setTargetPizza] = useState({});
  const [pizzaInBasket, setPizzaInBasket] = useState([]);

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
    const pizzaToKeep = pizzaInBasket.slice();
    const pizzaToRemove = pizzaToKeep.splice(index, 1);
    setPizzaInBasket(pizzaToKeep);
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
                  <div>Choose</div>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.basket}>
        Basket
        {pizzaInBasket.map((pizza, index) => {
          return (
            <div key={pizza}>
              <div onClick={() => handleBasketDeletion(index)}>
                <DeleteIcon />
              </div>
              <div>
                <div>{pizza.count}x {pizza.size} {pizza.name}</div>
                <div>${pizza.totalPrice} HKD</div>
              </div>
              {pizza.toppings.map((topping, index) => {
                if (index !== (pizza.toppings.length - 1)) {
                  return <span key={index}>{topping},  </span>;
                } else {
                  return <span key={index}>{topping} </span>;
                }
              })}
            </div>
          );
        })}
        <div>
          <Button
            variant="contained"
            disabled={pizzaInBasket.length === 0}
          >
            <div>Checkout</div>
          </Button>
        </div>
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