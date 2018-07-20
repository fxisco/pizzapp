import {
  ORDER_TYPES as ORDER,
  HOME_TYPES as HOME,
} from './order';

import { INGREDIENTS as INGREDIENTS_LIST } from './pizza';

export const ORDER_TYPES = {
  [ORDER.DELIVERY]: 'Domicilio',
  [ORDER.PICKUP]: 'Para recoger',
};

export const HOME_TYPES = {
  [HOME.HOUSE]: 'Casa',
  [HOME.APARTMENT]: 'Apartamento',
};

export const INGREDIENTS = {
  [INGREDIENTS_LIST.PEPERRONI]: 'Pepperoni',
  [INGREDIENTS_LIST.HAM]: 'Jamón',
  [INGREDIENTS_LIST.VEGETABLES]: 'Vegetales',
  [INGREDIENTS_LIST.CORN]: 'Maíz'
};

