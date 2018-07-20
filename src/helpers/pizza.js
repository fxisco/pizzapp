import { INGREDIENTS_PROPORTIONS } from '../conf/pizza';
import { INGREDIENTS } from '../conf/constants';

export const createPizza = () => {
  return {
    ingredients: {},
    ingredientsProportions: {},
    prize: 100
  };
};

export const formatPizzaIngredientsByProportions = (pizza) => {
  return pizza.ingredientsProportions && Object.keys(pizza.ingredientsProportions).reduce((accum, item) => {
    accum[pizza.ingredientsProportions[item]].push(INGREDIENTS[item]);

    return accum;
  }, {
    [INGREDIENTS_PROPORTIONS.RIGHT]: [],
    [INGREDIENTS_PROPORTIONS.LEFT]: [],
    [INGREDIENTS_PROPORTIONS.WHOLE]: []
  });
};
