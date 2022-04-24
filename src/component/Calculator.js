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
import ErrorMessage from "./ErrorMessage";

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

  const onClickOperator = useCallback(({ target }) => {
    const inputOperator = target.textContent;

    if (inputOperator === "=") {
      dispatch({ type: CALCULATE });
      return;
    }

    dispatch({ type: SET_OPERATOR, inputOperator });
  }, []);

  return (
    <>
      {data.error && <ErrorMessage error={data.error} />}
      <div className="calculator">
        <DisplayResult result={data.error ? "오류" : data.result} />
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
    </>
  );
};

export default Calculator;
