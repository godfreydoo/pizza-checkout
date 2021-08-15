/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Selection from '../components/Selection';
import { pizzas, toppings } from '../data/pizza';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const targetPizza = {
  id: 1,
  name: 'Pepperoni Pizza',
  photoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  price: {
    large: '230',
    medium: '135',
    small: '115'
  }
};
const handleBasketAddition = jest.fn();
const setModalStatus = jest.fn();

describe('Selection modal', () => {

  test('Toppings and size appear in selection', async () => {
    render(<Selection toppings={toppings} targetPizza={targetPizza} handleBasketAddition={handleBasketAddition} setModalStatus={setModalStatus}/>);
    expect(screen.getByText(/Italian Sausage/i)).toBeInTheDocument;
    expect(screen.getByText(/Pineapple/i)).toBeInTheDocument;
    expect(screen.getByText(/Italian Sausage/i)).toBeInTheDocument;
    expect(screen.getByText(/Grilled Chicken/i)).toBeInTheDocument;
    expect(screen.getByText(/Large/i)).toBeInTheDocument;
    expect(screen.getByText(/Medium/i)).toBeInTheDocument;
    expect(screen.getByText(/Small/i)).toBeInTheDocument;
  });

  xtest('Toppings and size appear in selection', async () => {
    render(<Selection toppings={toppings} targetPizza={targetPizza} handleBasketAddition={handleBasketAddition} setModalStatus={setModalStatus}/>);
    await userEvent.click(screen.getByTestId('topping-checkbox-Pepperoni'));
    const radio = screen.getByLabelText(/Medium/i);
    await fireEvent.change(radio, { target: { value: 'Medium' } });
    await userEvent.click(screen.getByRole('button'));
    expect(handleBasketAddition).toHaveBeenCalled();
    expect(setModalStatus).toHaveBeenCalled();
  });
});