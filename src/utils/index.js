export const calculate = (firstNumber, operator, secondNumber) => {
  switch (operator) {
    case "+":
      return Number(firstNumber) + Number(secondNumber);
    case "-":
      return Number(firstNumber) - Number(secondNumber);
    case "X":
      return Number(firstNumber) * Number(secondNumber);
    case "/":
      return Math.trunc(Number(firstNumber) / Number(secondNumber));
    default:
      throw new Error("존재하지 않는 연산자입니다.");
  }
};
