import moment from 'moment';

export const getStartOfDay = () => {
  return moment().startOf('day').toDate();
};

export const getEndOfDay = () => {
  return moment().endOf('day').toDate();
};
