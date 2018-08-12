import React from 'react';
import { ORDER_TYPES } from '../conf/constants';
import { INGREDIENTS_PROPORTIONS } from '../conf/constants';
import { formatPizzaIngredientsByProportions } from './pizza';

export const getOrderName = (type) => {
  return ORDER_TYPES[type];
};

export const filterOrdersByStatus = (orders, status) => {
  return Object.keys(orders).filter((id) => {
    const order = orders[id];

    return order.status === status;
  });
};

export const showIngredientsByProportion = (pizza) => {
  const ingredientsByProportions = formatPizzaIngredientsByProportions(pizza);

  return Object.keys(INGREDIENTS_PROPORTIONS).map((item) => {
    return ingredientsByProportions[item].length > 0 ? (
      <div key={item}>
        <b>{INGREDIENTS_PROPORTIONS[item]}</b>: {ingredientsByProportions[item].join(', ')}
      </div>
    ) : null;
  });
};
