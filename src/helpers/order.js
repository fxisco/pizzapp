import React from 'react';
import { ORDER_STATUS, ORDER_TYPES } from '../conf/order';
import { INGREDIENTS_PROPORTIONS } from '../conf/constants';
import { formatPizzaIngredientsByProportions } from './pizza';

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

export const getOrderNextStep = ({ orderType, status = '' }) => {
  if (status === ORDER_STATUS.EMITTED) {
    return ORDER_STATUS.IN_PREPARATION;
  } else if (status === ORDER_STATUS.IN_PREPARATION) {
    return ORDER_STATUS.COOKING;
  } else if (status === ORDER_STATUS.COOKING && orderType === ORDER_TYPES.DELIVERY) {
    return ORDER_STATUS.ON_DELIVERY;
  } else if (status === ORDER_STATUS.COOKING && orderType === ORDER_TYPES.PICKUP) {
    return ORDER_STATUS.READY;
  }

  return status;
};
