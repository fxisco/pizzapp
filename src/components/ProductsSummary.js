import React from 'react';
import { INGREDIENTS_PROPORTIONS } from '../conf/constants';
import { formatPizzaIngredientsByProportions } from '../helpers/pizza';

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
    {pizzas.map((pizza, index) => {
      const ingredientsByProportions = formatPizzaIngredientsByProportions(pizza);
      return (
        <tr key={`pizza-${index}`}>
          <th scope="row">{index + 1}</th>
          <td>
            {Object.keys(INGREDIENTS_PROPORTIONS).map((item) => {
              return ingredientsByProportions[item].length > 0 ? (
                <div key={item}>
                  <b>{INGREDIENTS_PROPORTIONS[item]}</b>: {ingredientsByProportions[item].join(', ')}
                </div>
              ) : null;
            })}
          </td>
          <td>{pizzaPrice}</td>
        </tr>
      );
    })}
    <tr>
      <td colSpan="2" className="text-right"><b>Total($):</b></td>
      <td><h3>{pizzaPrice * pizzas.length}</h3></td>
    </tr>
    </tbody>
  </table>
);

export default ProductsSummary;
