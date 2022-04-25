import { OPERATORS, ERROR_MESSAGES } from '../constants/constants';

export const tryCatcher = (func) => {
  return (...args) => {
    try {
      func(...args);
    } catch (error) {
      alert(error);
    }
  };
};

export const isNumberInvalid = (number) =>
  !Number.isFinite(number) || Number.isNaN(number);

export const calculate = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case OPERATORS.ADD:
      return firstNumber + secondNumber;
    case OPERATORS.SUBTRACT:
      return firstNumber - secondNumber;
    case OPERATORS.MULTIPLY:
      return firstNumber * secondNumber;
    case OPERATORS.DIVIDE:
      return secondNumber === 0
        ? Infinity
        : parseInt(firstNumber / secondNumber, 10);
    default:
      throw new Error(ERROR_MESSAGES.INVALID_OPERATOR);
  }
};

export const appendDigitToLastElem = (list, digit) => {
  const listClone = [...list];
  const lastElem = listClone.pop() ?? '';

  listClone.push(Number(lastElem + digit.toString()));

  return listClone;
};
