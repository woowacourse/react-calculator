import React, { useEffect, useState } from "react";

import "./App.css";

import DigitComponent from "./Components/DigitComponent";
import OperationComponent from "./Components/OperationComponent";
import AllClearComponent from "./Components/AllClearComponent";

import { convertToLocaleString } from "./utils";
import { SCREEN, EXPONENTIAL_LIMIT_POINT } from "./constant";

export default function App() {
  const prevCalculateInfo = JSON.parse(
    localStorage.getItem("calculateInfo")
  ) ?? {
    firstNumber: 0,
    operation: "",
    secondNumber: "",
  };

  useEffect(() => {
    window.addEventListener("beforeunload", confirmLeaveSite);

    return window.removeEventListener("unload", confirmLeaveSite);
  }, []);

  const [calculateInfo, setCalculateInfo] = useState(prevCalculateInfo);

  useEffect(() => {
    localStorage.setItem("calculateInfo", JSON.stringify(calculateInfo));
  }, [calculateInfo]);

  const confirmLeaveSite = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const handleDigitButton = ({ target }) => {
    if (
      String(calculateInfo.firstNumber).length >= SCREEN.MAX_TEXT_LENGTH &&
      calculateInfo.operation === ""
    ) {
      return;
    }

    if (String(calculateInfo.secondNumber).length >= SCREEN.MAX_TEXT_LENGTH) {
      return;
    }

    if (calculateInfo.operation) {
      const prevNumber = calculateInfo.secondNumber;

      setCalculateInfo((prevCalculateInfo) => ({
        ...prevCalculateInfo,
        secondNumber: Number(prevNumber + target.textContent),
      }));

      return;
    }

    const prevNumber = calculateInfo.firstNumber;

    setCalculateInfo((prevCalculateInfo) => ({
      ...prevCalculateInfo,
      firstNumber: isNaN(prevNumber)
        ? target.textContent
        : Number(prevNumber + target.textContent),
    }));
  };

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

  const handleAllClear = () => {
    setCalculateInfo(() => ({
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    }));
  };

  return (
    <div className="calculator">
      <h1
        className="total"
        style={{
          fontSize:
            String(calculateInfo.secondNumber || calculateInfo.firstNumber)
              .length > SCREEN.FONT_SIZE_SCALE_STANDARD
              ? "3rem"
              : "4rem",
        }}
      >
        {convertToLocaleString(
          calculateInfo.secondNumber || calculateInfo.firstNumber
        )}
      </h1>
      <DigitComponent onClick={handleDigitButton} />
      <AllClearComponent onClick={handleAllClear} />
      <OperationComponent
        calculateInfo={calculateInfo}
        onClick={handleOperationButton}
      />
    </div>
  );
}
