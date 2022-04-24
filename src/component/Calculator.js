import { useCallback, useEffect, useReducer } from "react";
import { OPERATORS } from "../constants";
import { calculate } from "../utils";

import ClearButton from "./ClearButton";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      localStorage.setItem("prevValue", 0);
      return action.data;
    }
    case "SET_FIRST_NUMBER": {
      const firstTotalNumber = state.firstNumber * 10 + Number(action.data);
      localStorage.setItem("prevValue", firstTotalNumber);

      return {
        ...state,
        firstNumber: firstTotalNumber,
        result: state.result === "0" ? action.data : firstTotalNumber,
      };
    }
    case "SET_SECOND_NUMBER": {
      const secondTotalNumber = state.secondNumber * 10 + Number(action.data);
      localStorage.setItem("prevValue", secondTotalNumber);

      return {
        ...state,
        secondNumber: secondTotalNumber,
        result: secondTotalNumber,
      };
    }
    case "SET_OPERATOR": {
      return {
        ...state,
        isFirstNumber: false,
        operator: action.data,
      };
    }
    case "CALCULATE": {
      const total = calculate(
        state.firstNumber,
        state.operator,
        state.secondNumber
      );
      localStorage.setItem("prevValue", total);

      return {
        ...state,
        firstNumber: total,
        secondNumber: 0,
        isFirstNumber: true,
        operator: null,
        result: total === Infinity || isNaN(total) ? "오류" : total,
      };
    }
    default:
      return state;
  }
};

const Calculator = () => {
  const [data, dispatch] = useReducer(reducer, {
    firstNumber: localStorage.getItem("prevValue") || 0,
    secondNumber: 0,
    isFirstNumber: true,
    operator: null,
    result: localStorage.getItem("prevValue") || "0",
  });

  const handleUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  });

  const onClickNumber = useCallback(
    ({ target }) => {
      const inputNumber = target.textContent;

      if (data.isFirstNumber) {
        dispatch({ type: "SET_FIRST_NUMBER", data: inputNumber });
        return;
      }

      dispatch({ type: "SET_SECOND_NUMBER", data: inputNumber });
    },
    [data.isFirstNumber]
  );

  const onClickModifier = useCallback(() => {
    const initData = {
      firstNumber: 0,
      secondNumber: 0,
      isFirstNumber: true,
      operator: null,
      result: "0",
    };
    dispatch({ type: "INIT", data: initData });
  }, []);

  const onClickOperator = useCallback(
    ({ target }) => {
      const inputOperator = target.textContent;

      if (inputOperator === "=" && !data.operator) {
        alert("올바른 계산이 아닙니다.");
        return;
      }

      if (inputOperator === "=") {
        dispatch({ type: "CALCULATE" });
        return;
      }

      if (data.operator) {
        alert("앞의 계산을 먼저 해주세요.");
        return;
      }

      dispatch({ type: "SET_OPERATOR", data: inputOperator });
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
