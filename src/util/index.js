const operation = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  'x': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => Math.floor(firstNumber / secondNumber),
};

export { operation };
