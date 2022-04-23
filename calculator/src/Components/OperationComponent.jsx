import React from "react";

import { EXPONENTIAL_LIMIT_POINT, SCREEN } from "../constant";
import OperationButtonComponent from "./OperationButtonComponent";

export default function OperationComponent({
  calculateInfo,
  setCalculateInfo,
}) {
  const operations = ["/", "X", "-", "+"];

  const calculateResultNumber = () => {
    const firstNumber = Number(calculateInfo.firstNumber);
    const secondNumber = Number(calculateInfo.secondNumber);
    let resultNumber = 0;

    switch (calculateInfo.operation) {
      case "X":
        resultNumber = firstNumber * secondNumber;
        break;
      case "/":
        resultNumber = firstNumber / secondNumber;
        break;
      case "+":
        resultNumber = firstNumber + secondNumber;
        break;
      case "-":
        resultNumber = firstNumber - secondNumber;
        break;
      default:
        break;
    }

    return resultNumber ?? firstNumber;
  };

  const generateResultNumber = (number) => {
    if (
      String(number).length > SCREEN.MAX_TEXT_LENGTH &&
      Number.isFinite(number)
    ) {
      return number.toExponential(EXPONENTIAL_LIMIT_POINT);
    }

    if (Number.isFinite(number)) {
      return number;
    }

    return SCREEN.ERROR_MESSAGE;
  };

  const canCalculate = (target) => {
    return target.textContent === "=" && calculateInfo.secondNumber !== "";
  };

  const handleOperationButton = ({ target }) => {
    if (canCalculate(target)) {
      const resultNumber = calculateResultNumber();

      setCalculateInfo(() => ({
        firstNumber: generateResultNumber(resultNumber),
        operation: "",
        secondNumber: "",
      }));

      return;
    }

    setCalculateInfo((prevCalculateInfo) => ({
      ...prevCalculateInfo,
      operation: target.textContent,
    }));
  };

  return (
    <div className="operations subgrid" onClick={handleOperationButton}>
      {operations.map((operation) => {
        return (
          <OperationButtonComponent
            key={operation}
            isFocused={calculateInfo.operation === operation}
            operation={operation}
          />
        );
      })}
      <button className="operation">=</button>
    </div>
  );
}
