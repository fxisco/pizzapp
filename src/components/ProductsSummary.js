import React from 'react';
import { showIngredientsByProportion } from '../helpers/order';

const ProductsSummary = ({ pizzas, pizzaPrice }) => (
  <table className="table">
    <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Descripción</th>
      <th scope="col">Precio</th>
    </tr>
    </thead>
    <tbody>
    {pizzas.map((pizza, index) => (
      <tr key={`pizza-${index}`}>
        <th scope="row">{index + 1}</th>
        <td>
          {showIngredientsByProportion(pizza)}
        </td>
        <td>{pizzaPrice}</td>
      </tr>
      ))}
    <tr>
      <td colSpan="2" className="text-right"><b>Total($):</b></td>
      <td><h3>{pizzaPrice * pizzas.length}</h3></td>
    </tr>
    </tbody>
  </table>
);

export default ProductsSummary;
