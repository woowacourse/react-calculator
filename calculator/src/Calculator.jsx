import { useEffect, useState } from "react";
import "./css/index.css";
import {
  FONT_SIZE_STANDARD,
  INFINITY_MESSAGE,
  MAX_CURRENT_LENGTH,
  digits,
  operators,
} from "./constants";

const Calculator = () => {
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [operator, setOperator] = useState("");
  const [isLastClickOperator, setIsLastClickOperator] = useState(false);

  useEffect(() => {
    const calcInfo = localStorage.getItem("calcInfo");
    if (calcInfo) {
      const { total, current, operator, isLastClickOperator } =
        JSON.parse(calcInfo);
      setTotal(total);
      setCurrent(current);
      setOperator(operator);
      setIsLastClickOperator(isLastClickOperator);
    }
  }, []);
  useEffect(() => {
    return () => {
      localStorage.setItem(
        "calcInfo",
        JSON.stringify({ total, current, operator, isLastClickOperator })
      );
    };
  }, [total, current, operator, isLastClickOperator]);

  const handleDigitClick = (digitValue) => {
    if (current.toString().length > MAX_CURRENT_LENGTH) {
      setCurrent(Infinity);
      return;
    }

    if (isLastClickOperator) {
      enterNewOperand(digitValue);
      return;
    }

    concatDigitOperand(digitValue);
  };

  const enterNewOperand = (digitValue) => {
    setCurrent(digitValue);
    setIsLastClickOperator(false);
  };

  const concatDigitOperand = (digitValue) => {
    setCurrent((prevState) => prevState * 10 + digitValue);
  };

  const handleOperatorClick = (operatorValue) => {
    updateOperator(operatorValue);

    if (isLastClickOperator) return;

    if (!operator) {
      calculate(current);
      return;
    }

    const result = operate(total, current, operator);

    calculate(result);
  };

  const updateOperator = (operatorValue) => {
    setOperator(operatorValue === "=" ? "" : operatorValue);
    setIsLastClickOperator(true);
  };

  const calculate = (result) => {
    setTotal(result);
    setCurrent(result);
  };

  const operate = (a, b, operator) => {
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "X":
        return a * b;
      case "/":
        return a / b;
      default:
        break;
    }
  };

  const handleClear = () => {
    setTotal(0);
    setCurrent(0);
    setOperator("");
    setIsLastClickOperator(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="total">
          <h1
            className={
              current.toString().length >= FONT_SIZE_STANDARD
                ? " small-total-font"
                : ""
            }
          >
            {current === Infinity ? INFINITY_MESSAGE : current}
          </h1>
        </div>
        <div className="digits flex">
          {digits.map((digit) => (
            <button
              key={digit.toString()}
              className="digit"
              onClick={(e) => handleDigitClick(Number(e.target.textContent))}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={handleClear}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {operators.map((operator) => (
            <button
              className="operation"
              key={operator}
              onClick={(e) => handleOperatorClick(e.target.textContent)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
