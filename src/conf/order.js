export const ORDER_TYPES = {
  DELIVERY: 'DELIVERY',
  PICKUP: 'PICKUP'
};

export const HOME_TYPES = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT'
};

export const STEPS = {
  CONTACT_FORM: 0,
  PIZZA_BUILDER: 1,
  CONFIRMATION: 2,
  THANK: 3
};

export const ORDER_STATUS = {
  ISSUED: 'ISSUED',
  IN_PREPARATION: 'IN_PREPARATION',
  COOKING: 'COOKING',
  ON_DELIVERY: 'ON_DELIVERY',
  READY: 'READY',
};

export const BOARD = [
  ORDER_STATUS.ISSUED,
  ORDER_STATUS.IN_PREPARATION,
  ORDER_STATUS.COOKING,
  ORDER_STATUS.READY,
  ORDER_STATUS.ON_DELIVERY
];

export const BOARD_TABLES = {
  [ORDER_STATUS.ISSUED]: {
    title: 'Ordenes entrantes',
    titleColor: '',
  },
  [ORDER_STATUS.IN_PREPARATION]: {
    title: 'En preparación',
    titleColor: 'bg-warning text-white',
  },
  [ORDER_STATUS.COOKING]: {
    title: 'En el horno',
    titleColor: 'bg-danger text-white',
  },
  [ORDER_STATUS.READY]: {
    title: 'Ordenes listas',
    titleColor: 'bg-success text-white',
  },
  [ORDER_STATUS.ON_DELIVERY]: {
    title: 'Ordenes en delivery',
    titleColor: 'bg-info text-white',
  },
};
