import React, { useState } from "react";
import Operator from "../elements/Operator";
import { add, sub, mul, div } from "../utils/operations";
import { OPERATORS, ERROR_MESSAGE } from "../constants";

function Operators({
  setScreenNumber,
  screenNumber,
  setStep,
  isNumberStep,
  recordNumber,
  setRecordNumber,
}) {
  const [operator, setOperator] = useState("");

  const onClickOperator = (curOperator) => {
    setStep(false);

    if (curOperator !== "=") {
      if (isNumberStep && recordNumber !== 0) {
        alert(ERROR_MESSAGE.OVER_INPUT_NUMBER_COUNT);
        return;
      }
      setRecordNumber(screenNumber);
      setOperator(curOperator);
      return;
    }

    setRecordNumber(0);

    let result = 0;

    switch (operator) {
      case "+":
        result = add(recordNumber, screenNumber);
        break;
      case "-":
        result = sub(recordNumber, screenNumber);
        break;
      case "X":
        result = mul(recordNumber, screenNumber);
        break;
      case "/":
        result = div(recordNumber, screenNumber);
        break;
      default:
        result = screenNumber;
        break;
    }

    if (!isFinite(result)) result = ERROR_MESSAGE.INFINITE_NUMBER;
    setScreenNumber(result);
    setOperator("");
  };

  return (
    <div className="operations subgrid">
      {OPERATORS.map((operator, index) => (
        <Operator
          onClickOperator={onClickOperator}
          operator={operator}
          key={index}
        />
      ))}
    </div>
  );
}

export default Operators;
