import moment from 'moment';

export const getStartOfDay = (date = moment()) => {
  return date.startOf('day').toDate();
};

export const getEndOfDay = (date = moment()) => {
  return date.endOf('day').toDate();
};

export const getDate = () => {
  return moment();
};
