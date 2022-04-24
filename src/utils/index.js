const calculateByOperation = {
  '/': (firstOperand, secondOperand) =>
    Math.floor(firstOperand / secondOperand),
  X: (firstOperand, secondOperand) => firstOperand * secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
};

export const computeExpression = ({
  firstOperand,
  secondOperand,
  operation,
}) => {
  const calculator = calculateByOperation[operation];
  if (!calculator) throw new Error('잘못된 연산자를 입력하였습니다.');
  return calculator(firstOperand, secondOperand);
};

export const hasInput = ({ firstOperand, secondOperand, operation }) =>
  firstOperand !== 0 || secondOperand !== -1 || operation !== null;

export const computeNextOperand = (currentOperand, digit) => {
  currentOperand = String(currentOperand);
  return currentOperand.length >= 3
    ? Number(`${currentOperand.slice(0, -1)}${digit}`)
    : Number(currentOperand + digit);
};
