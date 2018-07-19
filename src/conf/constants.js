import { ORDER_TYPES as ORDER, HOME_TYPES as HOME } from './order';

export const ORDER_TYPES = {
  [ORDER.DELIVERY]: 'Domicilio',
  [ORDER.PICKUP]: 'Para recoger',
};

export const HOME_TYPES = {
  [HOME.HOUSE]: 'Casa',
  [HOME.APARTMENT]: 'Apartamento',
};

