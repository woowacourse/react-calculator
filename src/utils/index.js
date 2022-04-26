import {
  CALCULATOR_ARITHMETIC_OPERATOR_LIST,
  FIXED_POINT_LENGTH,
  EMPTY_SECOND_OPERAND_ERROR_MESSAGE,
  PLUS,
  MINUS,
  MULTIPLY,
  DIVIDE,
  INFINITY_ERROR_TEXT,
} from '../constants';

export const isArithmeticOperator = (value) =>
  CALCULATOR_ARITHMETIC_OPERATOR_LIST.includes(value);

export const validateOperatorIsDuplicated = (value) => {
  if (isArithmeticOperator(value)) {
    throw new Error(EMPTY_SECOND_OPERAND_ERROR_MESSAGE);
  }
};

const toFixedValue = (value) => Number(value.toFixed(FIXED_POINT_LENGTH));

export const operations = {
  [PLUS]: (firstOperand, secondOperand) => firstOperand + secondOperand,
  [MINUS]: (firstOperand, secondOperand) => firstOperand - secondOperand,
  [MULTIPLY]: (firstOperand, secondOperand) => firstOperand * secondOperand,
  [DIVIDE]: (firstOperand, secondOperand) =>
    secondOperand === 0
      ? INFINITY_ERROR_TEXT
      : toFixedValue(firstOperand / secondOperand),
};
