import { ERROR_TEXT } from "../constants";

const calculate = (firstNumber, operator, secondNumber) => {
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
      return ERROR_TEXT;
  }
};

const saveLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? "0";
  } catch {
    throw new Error("저장된 데이터가 유효하지 않은 JSON 형식입니다.");
  }
};

export { calculate, saveLocalStorage, getLocalStorage };
