import pizzaData from '../../data/pizza';

export default function handler(req, res) {
  res.status(200).json(pizzaData);
}
