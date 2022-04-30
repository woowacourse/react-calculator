const operatorCollection = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  X: (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => Number.parseInt(firstNumber / secondNumber, 10),
};

export default operatorCollection;
