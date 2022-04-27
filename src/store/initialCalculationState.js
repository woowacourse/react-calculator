import { PREV_VALUE } from "../constants";
import { getLocalStorage } from "../utils";

const initialCalculationState = {
  firstNumber: getLocalStorage(PREV_VALUE) || 0,
  secondNumber: 0,
  isFirstNumber: true,
  operator: null,
  result: getLocalStorage(PREV_VALUE) || "0",
  error: null,
};

export { initialCalculationState };
