import { useCallback, useEffect, useReducer } from "react";
import {
  CALCULATE,
  INIT,
  OPERATORS,
  SET_NUMBER,
  SET_OPERATOR,
} from "../constants";

import { reducer } from "../store/reducer";
import { initialState } from "../store/initialState";

import ClearButton from "./ClearButton";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

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
    dispatch({ type: SET_NUMBER, inputNumber: target.textContent });
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
