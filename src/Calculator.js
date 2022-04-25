import React, { useEffect, useState } from "react";
import DisplayResult from "./component/DisplayResult";
import NumberButton from "./component/buttons/NumberButton";
import ModifierButton from "./component/buttons/ModifierButton";
import OperatorButton from "./component/buttons/OperatorButton";
import calculate from "./utils/calculate";

import "./css/calculator.css";

export default function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [operator, setOperator] = useState(null);
  const [secondNumber, setSecondNumber] = useState(0);
  const [isFirstNumber, setIsFirstNumber] = useState(true);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const prevValue = localStorage.getItem("prevValue") || 0;
    setFirstNumber(Number(prevValue));
    setResult(Number(prevValue));

    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }, []);

  const onClickNumber = (e) => {
    const inputNumber = e.target.textContent;
    const resultNumber = result === 0 ? inputNumber : result + inputNumber;
    setResult(resultNumber);

    if (isFirstNumber) {
      setFirstNumber(firstNumber * 10 + Number(inputNumber));
      return;
    }

    setSecondNumber(secondNumber * 10 + Number(inputNumber));
  };

  const onClickOperator = (e) => {
    if (firstNumber === "") return;

    const inputOperator = e.target.textContent;
    if (inputOperator === "=" && secondNumber === "") return;

    if (inputOperator !== "=") {
      setResult(result + inputOperator);
      setOperator(inputOperator);
      setIsFirstNumber(false);
      return;
    }

    onCalculate();
  };

  const onClickModifier = () => {
    setFirstNumber(0);
    setSecondNumber(0);
    setOperator(null);
    setIsFirstNumber(true);
    setResult(0);
    localStorage.setItem("prevValue", 0);
  };

  const onCalculate = () => {
    const res = calculate(firstNumber, secondNumber, operator);

    if (res === Infinity || isNaN(res)) {
      setFirstNumber(0);
      setSecondNumber(0);
      setResult("오류");
      setOperator(null);
      setIsFirstNumber(true);
      localStorage.setItem("prevValue", "오류");
      return;
    }

    setFirstNumber(res);
    setSecondNumber(0);
    setResult(res);
    setOperator(null);
    setIsFirstNumber(true);
    localStorage.setItem("prevValue", res);
  };

  return (
    <div id="app">
      <div className="calculator">
        <DisplayResult result={result} />
        <NumberButton onClick={onClickNumber} />
        <ModifierButton onClick={onClickModifier} />
        <OperatorButton onClick={onClickOperator} />
      </div>
    </div>
  );
}
