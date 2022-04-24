import { ERROR_MESSAGE, INFINITY_CASE_TEXT, OPERATORS } from '../constants';

const calculateExpression = (num1, operator, num2) => {
  switch (operator) {
    case OPERATORS.PLUS:
      return num1 + num2;
    case OPERATORS.MINUS:
      return num1 - num2;
    case OPERATORS.MULTIPLY:
      return num1 * num2;
    case OPERATORS.DIVIDE:
      return num2 === 0 ? INFINITY_CASE_TEXT : Number.parseInt(num1 / num2);
    default:
      throw new Error(ERROR_MESSAGE.STRANGE_OPERATOR(operator));
  }
};

export { calculateExpression };
