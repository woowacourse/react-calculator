import { MAX_LENGTH } from '../constant/calculator';

export const isExceedMaxLength = (number) => {
  return String(Math.abs(number)).length > MAX_LENGTH && number !== Infinity;
};

export const isEmptyOperator = (operator) => {
  return operator === '';
};
