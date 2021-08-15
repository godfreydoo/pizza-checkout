import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const Basket = function ( {pizzaInBasket, total, handleCheckout, handleBasketDeletion} ) {
  return (
    <div className={styles.basket}>
      <h1>Basket</h1>
      {pizzaInBasket.map((pizza, index) => {
        return (
          <section key={index}>
            <div className={styles.details}>
              <DeleteIcon
                onClick={() => handleBasketDeletion(index)}
                data-testid={`delete-button-${index}`}
              />
              <div>{pizza.count}x {pizza.size} {pizza.name}</div>
              <div>${pizza.totalPrice} HKD</div>
            </div>
            <div>
              {pizza.toppings.map((topping, index) => {
                if (index !== (pizza.toppings.length - 1)) {
                  return <span key={index}>{topping},  </span>;
                } else {
                  return <span key={index}>{topping} </span>;
                }
              })}
            </div>
          </section>
        );
      })}
      <p>
      Total: ${total} HKD
      </p>
      <div>
        <Button
          variant="contained"
          disabled={pizzaInBasket.length === 0}
          onClick={handleCheckout}
          data-testid="checkout-button"
        >
          <div>Checkout</div>
        </Button>
      </div>
    </div>
  );
};

Basket.propTypes = {
  handleBasketDeletion: PropTypes.func,
  pizzaInBasket: PropTypes.array,
  total: PropTypes.number,
  handleCheckout: PropTypes.func
};

export default Basket;