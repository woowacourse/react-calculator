import { ERROR_MSG, OPERATOR } from "../constants/constant";

export const getCalculateNumber = (operator, { prevNumbers, nextNumbers }) => {
  if (operator === OPERATOR.PLUS) {
    return prevNumbers + nextNumbers;
  }
  if (operator === OPERATOR.SUBTRACT) {
    return prevNumbers - nextNumbers;
  }
  if (operator === OPERATOR.MULTI) {
    return prevNumbers * nextNumbers;
  }
  if (operator === OPERATOR.DIVIDE) {
    const divideNum = prevNumbers / nextNumbers;
    if (!isFinite(divideNum)) {
      return ERROR_MSG.INFINITY;
    }
    return divideNum;
  }
};
