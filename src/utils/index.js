import {
  CALCULATOR_ARITHMETIC_OPERATOR_LIST,
  FIXED_POINT_LENGTH,
  EMPTY_SECOND_OPERAND_ERROR_MESSAGE,
} from '../constants';

export const isArithmeticOperator = (value) =>
  CALCULATOR_ARITHMETIC_OPERATOR_LIST.includes(value);

export const validateOperatorIsDuplicated = (value) => {
  if (isArithmeticOperator(value)) {
    throw new Error(EMPTY_SECOND_OPERAND_ERROR_MESSAGE);
  }
};

export const toFixedValue = (value) =>
  Number(value.toFixed(FIXED_POINT_LENGTH));
