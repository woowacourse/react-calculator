const OPERATORS = ["/", "X", "-", "+", "="];
const PREV_VALUE = "prevValue";
const ERROR_TEXT = "오류";

const RESET = "RESET";
const SET_NUMBER = "SET_NUMBER";
const SET_OPERATOR = "SET_OPERATOR";
const CALCULATE = "CALCULATE";

const ERROR_MESSAGES = {
  DUPLICATED_OPERATOR: "한번에 하나의 연산기호만 입력가능합니다.",
  INCORRECT_CALCULATION: "올바른 계산이 아닙니다.",
};

export {
  OPERATORS,
  PREV_VALUE,
  ERROR_TEXT,
  RESET,
  SET_NUMBER,
  SET_OPERATOR,
  CALCULATE,
  ERROR_MESSAGES,
};
