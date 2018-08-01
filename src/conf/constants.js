import {
  ORDER_TYPES as ORDER,
  HOME_TYPES as HOME,
  ORDER_STATUS as STATUS,
  STEPS
} from './order';

import {
  INGREDIENTS as INGREDIENTS_LIST,
  INGREDIENTS_PROPORTIONS as PROPORTIONS
} from './pizza';

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

export const INGREDIENTS_PROPORTIONS = {
  [PROPORTIONS.LEFT]: 'Izquierda',
  [PROPORTIONS.RIGHT]: 'Derecha',
  [PROPORTIONS.WHOLE]: 'Completa'
};

export const ORDER_STATUS = {
  [STATUS.EMITTED]: 'Orden Emitida',
  [STATUS.COOKING]: 'Cocinando',
  [STATUS.IN_PREPARATION]: 'En preparación',
  [STATUS.COOKING]: 'En el horno',
  [STATUS.READY]: 'Orden lista',
  [STATUS.ON_DELIVERY]: 'En delivery',
};

export const STEP_TITLE = {
  [STEPS.CONTACT_FORM]: 'Formulario de contacto',
  [STEPS.PIZZA_BUILDER]: 'Construye tu pizza',
  [STEPS.CONFIRMATION]: 'Confirmación de orden',
  [STEPS.THANK]: 'Gracias por su orden',
};


export const NAME = 'Pizzería';
