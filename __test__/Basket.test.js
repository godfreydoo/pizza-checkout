/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Basket from '../components/Basket';
import { pizzas, toppings } from '../data/pizza';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const pizzaInBasket = [
  {
    count: 1,
    name: 'Pepperoni Pizza',
    size: 'Large',
    toppings: ['Pepperoni', 'Imported Ham', 'Genoa Salami'],
    totalPrice: 275
  },
  {
    count: 1,
    name: 'Cheese Pizza',
    size: 'Medium',
    toppings: ['White Onions', 'Imported Ham', 'Genoa Salami'],
    totalPrice: 180
  }
];
const total = 455;
const handleCheckout = jest.fn();
const handleBasketDeletion = jest.fn();

describe('Checkout basket', () => {

  test('Basket is updated when pizza(s) is added', async () => {
    render(<Basket pizzaInBasket={pizzaInBasket} total={total} handleCheckout={handleCheckout} handleBasketDeletion={handleBasketDeletion}/>);
    expect(screen.getByText(/455 HKD/i)).toBeInTheDocument; // total
    expect(screen.getByText(/1x Large Pepperoni Pizza/i)).toBeInTheDocument;
    expect(screen.getByText(/1x Medium Cheese Pizza/i)).toBeInTheDocument;
    expect(screen.getAllByText(/Imported Ham/i)).toBeInTheDocument;
  });

  test('Basket is updated when pizza(s) is removed', async () => {
    render(<Basket pizzaInBasket={pizzaInBasket} total={total} handleCheckout={handleCheckout} handleBasketDeletion={handleBasketDeletion}/>);
    await userEvent.click(screen.getByTestId('delete-button-0'));
    expect(screen.getByText(/180 HKD/i)).toBeInTheDocument; // updated total
    expect(handleBasketDeletion).toHaveBeenCalled();
  });

  test('Checkout button can be clicked when basket has at least one item', async () => {
    render(<Basket pizzaInBasket={pizzaInBasket} total={total} handleCheckout={handleCheckout} handleBasketDeletion={handleBasketDeletion}/>);
    await userEvent.click(screen.getByTestId('checkout-button'));
    expect(handleCheckout).toHaveBeenCalled();
  });
});