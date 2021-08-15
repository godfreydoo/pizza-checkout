import React, { useState } from 'react';
import styles from '../styles/Selection.module.scss';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const Selection = function ( {toppings, targetPizza} ) {
  const [selectedToppings, setSelectedToppings] = useState({});
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleSelectedToppings = (e) => {
    var toAdd = e.target.checked === true;
    setSelectedToppings(prevToppings => { return {...prevToppings, [e.target.value]: toAdd}; });
  };

  const handleSelectedSizeAndPrice = (e) => {
    setSelectedSize(e.target.value);
    setSelectedPrice(targetPizza.price[e.target.value]);
  };

  return (
    <div>
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

      <div>
        <Button
          variant="contained"
        >
          <div>Add to Basket</div>
        </Button>
      </div>
    </div>
  );
};

Selection.propTypes = {
  toppings: PropTypes.array,
  targetPizza: PropTypes.object
};

export default Selection;