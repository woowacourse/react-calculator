import "./App.css";
import React, { useState, useEffect } from "react";
import Digit from "./component/Digit";
import Operation from "./component/Operation";
import {
  checkMaxNumberLength,
  checkValidEqualOperation,
  checkValidOperation,
} from "./util/validator.js";

function Calculator() {
  const [numbers, setNumbers] = useState(["", ""]);
  const [operator, setOperator] = useState("");
  const [calculated, setCalculated] = useState(false);

  const offset = operator === "" ? 0 : 1;

  const handleBeforeUpload = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "calculate-situation",
      JSON.stringify({ numbers, operator, calculated })
    );
    e.returnValue = "";
  };

  const handleClickDigit = (e) => {
    try {
      checkMaxNumberLength(numbers, offset);

      if (calculated) {
        setNumbers([e.target.innerText, ""]);
        setOperator("");
        setCalculated(false);

        return;
      }

      const digit = Number(e.target.innerText);

      setNumbers((prevNumbers) =>
        prevNumbers.map((number, index) =>
          index === offset ? number + digit : number
        )
      );
      setCalculated(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClickOperation = (e) => {
    try {
      if (e.target.innerText === "=") {
        handleClickEqualOperation();
        return;
      }

      if (calculated) {
        setNumbers([resultRender(), ""]);
        setOperator(e.target.innerText);
        setCalculated(false);

        return;
      }

      checkValidOperation(numbers, offset);
      setOperator(e.target.innerText);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClickEqualOperation = () => {
    try {
      checkValidEqualOperation(numbers);

      if (calculated) {
        setNumbers([resultRender(), numbers[1]]);
      }

      setCalculated(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClickClearButton = () => {
    setNumbers(["", ""]);
    setOperator("");
    setCalculated(false);
  };

  const totalRender = () => {
    return calculated ? resultRender() : numberOperationRender();
  };

  const numberOperationRender = () => {
    return numbers[0] ? `${numbers[0]}${operator}${numbers[1]}` : 0;
  };

  const resultRender = () => {
    if (operator === "+") {
      return Number(numbers[0]) + Number(numbers[1]);
    }
    if (operator === "X") {
      return Number(numbers[0]) * Number(numbers[1]);
    }
    if (operator === "-") {
      return Number(numbers[0]) - Number(numbers[1]);
    }
    if (operator === "/") {
      const result = Math.floor(Number(numbers[0]) / Number(numbers[1]));
      return result === Infinity ? "오류" : result;
    }
  };

  useEffect(() => {
    const calculationSituation = localStorage.getItem("calculate-situation");

    if (calculationSituation) {
      const calculationStatus = JSON.parse(calculationSituation);

      setNumbers(calculationStatus.numbers);
      setOperator(calculationStatus.operator);
      setCalculated(calculationStatus.calculated);
    }

    window.addEventListener("beforeunload", handleBeforeUpload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUpload);
    };
  }, []);

  return (
    <div id="app">
      <div className="calculator">
        <h1 id="total">{totalRender()}</h1>
        <Digit handleClickDigit={handleClickDigit}></Digit>
        <Operation
          handleClickOperation={handleClickOperation}
          handleClickClearButton={handleClickClearButton}
        />
      </div>
    </div>
  );
}

export default Calculator;
