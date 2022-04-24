import {
  CALCULATE,
  ERROR_TEXT,
  INIT,
  PREV_VALUE,
  SET_NUMBER,
  SET_OPERATOR,
} from "../constants";
import { calculate, saveLocalStorage } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      saveLocalStorage(PREV_VALUE, 0);
      return {
        firstNumber: 0,
        secondNumber: 0,
        isFirstNumber: true,
        operator: null,
        result: "0",
      };
    }
    case SET_NUMBER: {
      if (state.isFirstNumber) {
        const firstTotalNumber =
          state.firstNumber * 10 + Number(action.inputNumber);
        saveLocalStorage(PREV_VALUE, firstTotalNumber);

        return {
          ...state,
          firstNumber: firstTotalNumber,
          result: state.result === "0" ? action.inputNumber : firstTotalNumber,
        };
      }

      const secondTotalNumber =
        state.secondNumber * 10 + Number(action.inputNumber);
      saveLocalStorage(PREV_VALUE, secondTotalNumber);

      return {
        ...state,
        secondNumber: secondTotalNumber,
        result: secondTotalNumber,
      };
    }
    case SET_OPERATOR: {
      return {
        ...state,
        isFirstNumber: false,
        operator: action.inputOperator,
      };
    }
    case CALCULATE: {
      const total = calculate(
        state.firstNumber,
        state.operator,
        state.secondNumber
      );
      saveLocalStorage(PREV_VALUE, total);

      return {
        ...state,
        firstNumber: total,
        secondNumber: 0,
        isFirstNumber: true,
        operator: null,
        result: total === Infinity || isNaN(total) ? ERROR_TEXT : total,
      };
    }
    default:
      return state;
  }
};

export { reducer };
