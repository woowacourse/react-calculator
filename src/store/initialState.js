import { PREV_VALUE } from "../constants";
import { getLocalStorage } from "../utils";

const initialState = {
  firstNumber: getLocalStorage(PREV_VALUE) || 0,
  secondNumber: 0,
  isFirstNumber: true,
  operator: null,
  result: getLocalStorage(PREV_VALUE) || "0",
};

export { initialState };
