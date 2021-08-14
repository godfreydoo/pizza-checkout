import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { pizzas, toppings } from '../data/pizza';

const Home = ({ pizzas, toppings }) => {

  return (
    <div className={styles.container}>
      <div className={styles.pizza}>
        <div className={styles.grid}>
          {pizzas.map((value, index) => {
            return (
              <div className={styles.card} key={value.id}>
                <Image src={value.photoUrl} height={350} width={400} alt={value.name} className={styles.image}/>
                <p>{value.name}</p>
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