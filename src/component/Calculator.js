import { useCallback, useEffect, useReducer } from "react";
import {
  CALCULATE,
  ERROR_TEXT,
  INIT,
  OPERATORS,
  PREV_VALUE,
  SET_NUMBER,
  SET_OPERATOR,
} from "../constants";
import { calculate, getLocalStorage, saveLocalStorage } from "../utils";

import ClearButton from "./ClearButton";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

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

const initialState = {
  firstNumber: getLocalStorage(PREV_VALUE) || 0,
  secondNumber: 0,
  isFirstNumber: true,
  operator: null,
  result: getLocalStorage(PREV_VALUE) || "0",
};

const Calculator = () => {
  const [data, dispatch] = useReducer(reducer, initialState);

  const handleUnload = useCallback((event) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  });

  const onClickNumber = useCallback(({ target }) => {
    const inputNumber = target.textContent;

    dispatch({ type: SET_NUMBER, inputNumber });
  }, []);

  const onClickModifier = useCallback(() => {
    dispatch({ type: INIT });
  }, []);

  const onClickOperator = useCallback(
    ({ target }) => {
      const inputOperator = target.textContent;

      if (inputOperator === "=" && !data.operator) {
        alert("올바른 계산이 아닙니다.");
        return;
      }
      if (inputOperator === "=") {
        dispatch({ type: CALCULATE });
        return;
      }
      if (data.operator) {
        alert("앞의 계산을 먼저 해주세요.");
        return;
      }

      dispatch({ type: SET_OPERATOR, inputOperator });
    },
    [data.operator]
  );

  return (
    <div className="calculator">
      <DisplayResult result={data.result} />
      <div className="digits flex">
        {Array.from({ length: 10 }, (_, index) => (
          <NumberButton
            key={index}
            number={9 - index}
            onClickNumber={onClickNumber}
          />
        ))}
      </div>
      <div className="modifiers subgrid">
        <ClearButton onClickModifier={onClickModifier} />
      </div>
      <div className="operations subgrid">
        {OPERATORS.map((operator) => (
          <OperatorButton
            key={operator}
            operator={operator}
            onClickOperator={onClickOperator}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
