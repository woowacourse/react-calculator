import { useEffect, useState } from "react";
import { OPERATORS } from "../constants";
import ClearButton from "./ClearButton";
import DisplayResult from "./DisplayResult";
import NumberButton from "./NumberButton";
import OperatorButton from "./OperatorButton";

const Calculator = () => {
  const [data, setData] = useState({
    firstNumber: localStorage.getItem("prevValue") || 0,
    isFirstNumber: true,
    secondNumber: 0,
    operator: null,
    result: localStorage.getItem("prevValue") || "0",
  });

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

  const onClickNumber = ({ target }) => {
    const inputNumber = target.textContent;

    if (data.isFirstNumber) {
      const firstNumber = data.firstNumber * 10 + Number(inputNumber);
      localStorage.setItem("prevValue", firstNumber);

      setData({
        ...data,
        firstNumber,
        result: data.result === "0" ? inputNumber : firstNumber,
      });
      return;
    }

    const secondNumber = data.secondNumber * 10 + Number(inputNumber);
    localStorage.setItem("prevValue", secondNumber);

    setData({
      ...data,
      secondNumber,
      result: secondNumber,
    });
  };

  const onClickModifier = () => {
    setData({
      firstNumber: 0,
      secondNumber: 0,
      operator: null,
      isFirstNumber: true,
      result: "0",
    });
  };

  const calculate = () => {
    const { operator, firstNumber, secondNumber } = data;

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

  const onClickOperator = ({ target }) => {
    const inputOperator = target.textContent;

    if (inputOperator === "=") {
      const total = calculate();
      localStorage.setItem("prevValue", total);

      setData({
        ...data,
        firstNumber: total,
        result: total === Infinity || isNaN(total) ? "오류" : total,
        secondNumber: 0,
        operator: null,
      });
      return;
    }

    if (data.operator) {
      alert("앞의 계산을 먼저 해주세요.");
      return;
    }

    setData({
      ...data,
      operator: inputOperator,
      isFirstNumber: false,
    });
  };

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
