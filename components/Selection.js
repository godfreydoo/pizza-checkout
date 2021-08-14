import React from 'react';
import PropTypes from 'prop-types';

const Selection = function ( {toppings, targetPizza} ) {
  return (
    <div>
      {toppings.map((value, index) => {
        return (
          <div key={index}>{value}</div>
        );
      })}
      {targetPizza.name}
    </div>
  );
};

Selection.propTypes = {
  toppings: PropTypes.array,
  targetPizza: PropTypes.object
};

export default Selection;