import { OPERAND_MAX_LENGTH } from '../constants';

const operation = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  'x': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => Math.floor(firstNumber / secondNumber),
};

const isOverOperandMaxLength = (number) => {
  return number.length >= OPERAND_MAX_LENGTH;
};

export { operation, isOverOperandMaxLength };
