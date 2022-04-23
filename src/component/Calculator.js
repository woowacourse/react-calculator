import { useEffect, useState } from "react";
import { OPERATORS } from "../constants";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState(
    localStorage.getItem("prevValue") || 0
  );
  const [secondNumber, setSecondNumber] = useState(0);
  const [operator, setOperator] = useState(null);
  const [isFirstNumber, setIsFirstNumber] = useState(true);
  const [result, setResult] = useState(
    localStorage.getItem("prevValue") || "0"
  );

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

  const initState = () => {
    setFirstNumber(0);
    setSecondNumber(0);
    setOperator(null);
    setIsFirstNumber(true);
    setResult("0");
  };

  const onClickNumber = ({ target }) => {
    const inputNumber = target.textContent;

    if (result === "0") {
      setResult(inputNumber);
    } else {
      setResult(result + inputNumber);
    }

    if (isFirstNumber) {
      setFirstNumber(firstNumber * 10 + Number(inputNumber));
      return;
    }

    setSecondNumber(secondNumber * 10 + Number(inputNumber));
  };

  const onClickModifier = () => {
    localStorage.setItem("prevValue", 0);
    initState();
  };

  const onClickOperator = ({ target }) => {
    const inputOperator = target.textContent;

    // if (firstNumber === "") return;
    // if (inputOperator === "=" && secondNumber === 0) return; // 9+0 같은거도 막아버려서..
    setResult(result + inputOperator);

    if (inputOperator !== "=") {
      setOperator(inputOperator);
      setIsFirstNumber(false);
      return;
    }

    const total = calculate();
    initState();

    if (total === Infinity || isNaN(total)) {
      localStorage.setItem("prevValue", "오류");
      setResult("오류");
      return;
    }

    setResult(total);
    setFirstNumber(total);
    localStorage.setItem("prevValue", total);
  };

  const calculate = () => {
    switch (operator) {
      case "+":
        return Number(firstNumber) + Number(secondNumber);
      case "-":
        return Number(firstNumber) - Number(secondNumber);
      case "X":
        return Number(firstNumber) * Number(secondNumber);
      case "/":
        return Math.trunc(Number(firstNumber) / Number(secondNumber));
      default:
        throw new Error("존재하지 않는 연산자입니다.");
    }
  };

  return (
    <div className="calculator">
      <DisplayResult result={result} />
      <div className="digits flex" onClick={onClickNumber}>
        {Array.from({ length: 10 }, (_, index) => (
          <NumberButton key={index} number={9 - index} />
        ))}
      </div>
      <div className="modifiers subgrid" onClick={onClickModifier}>
        <button className="modifier">AC</button>
      </div>
      <div className="operations subgrid" onClick={onClickOperator}>
        {OPERATORS.map((operator) => (
          <OperatorButton key={operator} operator={operator} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
