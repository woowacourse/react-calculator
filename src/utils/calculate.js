const calculateValue = (firstNumber, secondNumber, operator) => {
  return (() => {
    switch (operator) {
      case "+":
        return add(firstNumber, secondNumber);
      case "-":
        return sub(firstNumber, secondNumber);
      case "X":
        return multiple(firstNumber, secondNumber);
      case "/":
        return divide(firstNumber, secondNumber);
      default:
        throw new Error("존재하지 않는 연산자입니다.");
    }
  })();
};

const add = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber;
};

const sub = (firstNumber, secondNumber) => {
  return firstNumber - secondNumber;
};

const divide = (firstNumber, secondNumber) => {
  return Math.floor(firstNumber / secondNumber);
};

const multiple = (firstNumber, secondNumber) => {
  return firstNumber * secondNumber;
};

export default calculateValue;
