/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../pages/index';
import { pizzas, toppings } from '../data/pizza';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Home page', () => {

  test('List of pizzas appear with checkout basket empty', async () => {
    render(<Home pizzas={pizzas} toppings={toppings}/>);
    expect(screen.getAllByText(/Pepperoni Pizza/i)).toBeInTheDocument;
    expect(screen.getByText(/Basket/i)).toBeInTheDocument;
    expect(screen.getByTestId('checkout-button').disabled).toBe(true);
  });

});