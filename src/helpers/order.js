import { ORDER_TYPES } from '../conf/constants';

export const getOrderName = (type) => {
  return ORDER_TYPES[type];
};
