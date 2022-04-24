export const computeExpression = ({
  firstOperand,
  secondOperand,
  operation,
}) => {
  if (operation === '/') {
    return Math.floor(firstOperand / secondOperand);
  }
  if (operation === 'X') {
    return firstOperand * secondOperand;
  }
  if (operation === '-') {
    return firstOperand - secondOperand;
  }
  if (operation === '+') {
    return firstOperand + secondOperand;
  }
};

export const hasInput = ({ firstOperand, secondOperand, operation }) =>
  firstOperand !== 0 || secondOperand !== -1 || operation !== null;

export const computeNextOperand = (currentOperand, digit) => {
  currentOperand = String(currentOperand);
  return currentOperand.length >= 3
    ? Number(`${currentOperand.slice(0, -1)}${digit}`)
    : Number(currentOperand + digit);
};
