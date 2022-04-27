import { useCallback, useEffect, useReducer } from "react";
import {
  CALCULATE,
  RESET,
  OPERATORS,
  SET_NUMBER,
  SET_OPERATOR,
} from "../constants";

import { calculationReducer } from "../store/calculationReducer";
import { initialCalculationState } from "../store/initialCalculationState";

import ClearButton from "./ClearButton";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";
import ErrorMessage from "./ErrorMessage";

const Calculator = () => {
  const [calculationState, dispatch] = useReducer(
    calculationReducer,
    initialCalculationState
  );

  const handleUnload = useCallback((event) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  const onClickNumber = useCallback(({ target }) => {
    dispatch({ type: SET_NUMBER, inputNumber: target.textContent });
  }, []);

  const onClickModifier = useCallback(() => {
    dispatch({ type: RESET });
  }, []);

  const onClickOperator = useCallback(({ target }) => {
    const inputOperator = target.textContent;

    if (inputOperator === "=") {
      dispatch({ type: CALCULATE });
      return;
    }

    dispatch({ type: SET_OPERATOR, inputOperator });
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <>
      {calculationState.error && (
        <ErrorMessage error={calculationState.error} />
      )}
      <div className="calculator">
        <DisplayResult
          result={calculationState.error ? "오류" : calculationState.result}
        />
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
