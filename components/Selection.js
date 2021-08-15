import React, { useState, useEffect } from 'react';
import styles from '../styles/Selection.module.scss';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const toppingPriceEach = 15;

const Selection = function ( {toppings, targetPizza, handleBasketChange, setModalStatus} ) {
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const toppingPrice = Object.keys(selectedToppings).length * toppingPriceEach;
    setTotalPrice(Number(selectedPrice) + toppingPrice);
  }, [selectedToppings, selectedSize, selectedPrice]);

  const handleSelectedToppings = (e) => {
    var toAdd = e.target.checked === true;
    setSelectedToppings(prevToppings => { return {...prevToppings, [e.target.value]: toAdd}; });
  };

  const handleSelectedSizeAndPrice = (e) => {
    setSelectedSize(e.target.value);
    setSelectedPrice(targetPizza.price[e.target.value]);
  };

  const addPizzaToBasket = () => {
    const toppingsToAdd = Object.keys(selectedToppings).filter(value => selectedToppings[value] === true);
    const pizza = {
      name: targetPizza.name,
      toppings: toppingsToAdd,
      size: selectedSize,
      totalPrice: totalPrice
    };
    handleBasketChange(pizza);
    setModalStatus(false);
  };

  return (
    <div>
      <p>Toppings are $15 each</p>
      <div className={styles.toppings}>
        {toppings.map((value, index) => {
          return (
            <div key={index}>
              <Checkbox value={value} onChange={handleSelectedToppings} />
              {value}
            </div>
          );
        })}
      </div>

      <Radio
        checked={selectedSize === 'large'}
        onChange={handleSelectedSizeAndPrice}
        value="large"
        name="pizzaSize"
      />
      {`Large - $${targetPizza.price.large}`}
      <Radio
        checked={selectedSize === 'medium'}
        onChange={handleSelectedSizeAndPrice}
        value="medium"
        name="pizzaSize"
      />
      {`Medium - $${targetPizza.price.medium}`}
      <Radio
        checked={selectedSize === 'small'}
        onChange={handleSelectedSizeAndPrice}
        value="small"
        name="pizzaSize"
      />
      {`Small - $${targetPizza.price.small}`}

      <div>Total Price is ${totalPrice} HKD</div>

      <div>
        <Button
          variant="contained"
          onClick={addPizzaToBasket}
        >
          <div>Add to Basket</div>
        </Button>
      </div>
    </div>
  );
};

Selection.propTypes = {
  toppings: PropTypes.array,
  targetPizza: PropTypes.object,
  handleBasketChange: PropTypes.func,
  setModalStatus: PropTypes.func
};

export default Selection;