import React, { useState, useEffect } from 'react';
import styles from '../styles/Selection.module.scss';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const toppingPriceEach = 15;

const findToppingsToAdd = (toppings) => {
  return Object.keys(toppings).filter(value => toppings[value] === true);
};

const Selection = function ( {toppings, targetPizza, handleBasketAddition, setModalStatus} ) {
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const toppingPrice = findToppingsToAdd(selectedToppings).length * toppingPriceEach;
    setTotalPrice(Number(selectedPrice) + toppingPrice);
  }, [selectedToppings, selectedPrice]);

  const handleSelectedToppings = (e) => {
    var toAdd = e.target.checked === true;
    setSelectedToppings(prevToppings => { return {...prevToppings, [e.target.value]: toAdd}; });
  };

  const handleSelectedSizeAndPrice = (e) => {
    setSelectedSize(e.target.value);
    setSelectedPrice(targetPizza.price[e.target.value.toLowerCase()]);
  };

  const addPizzaToBasket = () => {
    if (!selectedSize) {
      window.alert('Please select a pizza size');
    } else {
      const pizza = {
        name: targetPizza.name,
        toppings: findToppingsToAdd(selectedToppings),
        size: selectedSize,
        totalPrice: totalPrice,
        count: 1
      };
      handleBasketAddition(pizza);
      setModalStatus(false);
    }
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
        checked={selectedSize === 'Large'}
        onChange={handleSelectedSizeAndPrice}
        value="Large"
        name="pizzaSize"
      />
      {`Large - $${targetPizza.price.large}`}
      <Radio
        checked={selectedSize === 'Medium'}
        onChange={handleSelectedSizeAndPrice}
        value="Medium"
        name="pizzaSize"
      />
      {`Medium - $${targetPizza.price.medium}`}
      <Radio
        checked={selectedSize === 'Small'}
        onChange={handleSelectedSizeAndPrice}
        value="Small"
        name="pizzaSize"
      />
      {`Small - $${targetPizza.price.small}`}

      <p>Total Price is ${totalPrice} HKD</p>

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
  handleBasketAddition: PropTypes.func,
  setModalStatus: PropTypes.func
};

export default Selection;