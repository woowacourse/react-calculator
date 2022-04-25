import React, { useEffect, useState } from "react";
import DisplayResult from "./component/DisplayResult";
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

  const initState = () => {
    setFirstNumber(0);
    setSecondNumber(0);
    setOperator(null);
    setIsFirstNumber(true);
    setResult(0);
  };

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
    initState();
    localStorage.setItem("prevValue", 0);
  };

  const onCalculate = () => {
    const res = calculateValue();

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

  const calculateValue = () => {
    return (() => {
      switch (operator) {
        case "+":
          return add();
        case "-":
          return sub();
        case "X":
          return multiple();
        case "/":
          return divide();
        default:
          throw new Error("존재하지 않는 연산자입니다.");
      }
    })();
  };

  const add = () => {
    return firstNumber + secondNumber;
  };

  const sub = () => {
    return firstNumber - secondNumber;
  };

  const divide = () => {
    return Math.floor(firstNumber / secondNumber);
  };

  const multiple = () => {
    return firstNumber * secondNumber;
  };

  return (
    <div id="app">
      <div className="calculator">
        <DisplayResult result={result} />
        <div className="digits flex" onClick={onClickNumber}>
          {Array.from({ length: 10 }, (v, i) => (
            <button className="digit" key={9 - i}>
              {9 - i}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid" onClick={onClickModifier}>
          <button className="modifier">AC</button>
        </div>
        <div className="operations subgrid" onClick={onClickOperator}>
          {Array.from(["/", "X", "-", "+", "="], (v, i) => (
            <button className="digit" key={v}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
