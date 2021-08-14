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

  return (
    <div className={styles.container}>
      {modalStatus && <ComposeModal setModalStatus={setModalStatus} body={<Selection toppings={toppings} targetPizza={targetPizza}/>}/>}

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
          Checkout
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