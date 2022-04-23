import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Digit from "./component/Digit";
import Operation from "./component/Operation";
import {
  checkMaxNumberLength,
  checkValidEqualOperation,
  checkValidOperation,
} from "./util/validator.js";

const Calculator = () => {
  const [numbers, setNumbers] = useState(["", ""]);
  const [operator, setOperator] = useState("");
  const [calculated, setCalculated] = useState(false);

  const onBeforeUnload = useCallback(
    (event) => {
      event.preventDefault();
      localStorage.setItem(
        "calculate-state",
        JSON.stringify({ numbers, operator, calculated })
      );
      event.returnValue = "";
    },
    [numbers, operator, calculated]
  );

  useEffect(() => {
    const calculationState = localStorage.getItem("calculate-state");

    if (calculationState) {
      const { numbers, operator, calculated } = JSON.parse(calculationState);
      setNumbers(numbers);
      setOperator(operator);
      setCalculated(calculated);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [onBeforeUnload]);

  const offset = useCallback(() => (operator === "" ? 0 : 1), [operator]);

  const resultRender = useCallback(() => {
    if (operator === "+") {
      return Number(numbers[0]) + Number(numbers[1]);
    }
    if (operator === "x") {
      return Number(numbers[0]) * Number(numbers[1]);
    }
    if (operator === "-") {
      return Number(numbers[0]) - Number(numbers[1]);
    }
    if (operator === "/") {
      const result = Math.floor(Number(numbers[0]) / Number(numbers[1]));
      return result === Infinity ? "오류" : result;
    }
  }, [numbers, operator]);

  const onClickDigit = useCallback(
    (number) => {
      try {
        checkMaxNumberLength(numbers, offset());
        if (calculated) {
          setNumbers([number, ""]);
          setOperator("");
          setCalculated(false);
          return;
        }

        const digit = Number(number);
        const newNumbers = [...numbers];

        newNumbers[offset()] += digit;
        setNumbers(newNumbers);
        setCalculated(false);
      } catch (err) {
        alert(err.message);
      }
    },
    [calculated, numbers, offset]
  );

  const onClickOperation = useCallback(
    (operator) => {
      try {
        if (calculated) {
          setNumbers([resultRender(), ""]);
          setOperator(operator);
          setCalculated(false);
          return;
        }

        checkValidOperation(numbers, offset());

        setOperator(operator);
      } catch (err) {
        alert(err.message);
      }
    },
    [calculated, numbers, offset, resultRender]
  );

  const onClickEqualOperation = useCallback(() => {
    try {
      checkValidEqualOperation(numbers);

      if (calculated) {
        setNumbers([resultRender(), numbers[1]]);
        setCalculated(true);
        return;
      }

      setCalculated(true);
    } catch (err) {
      alert(err.message);
    }
  }, [calculated, numbers, resultRender]);

  const onClickClearButton = useCallback(() => {
    setNumbers(["", ""]);
    setOperator("");
    setCalculated(false);
  }, []);

  const decideTotalValue = () => {
    return calculated ? resultRender() : numberOperationRender();
  };

  const numberOperationRender = () => {
    if (numbers[0] === "") {
      return "0";
    }

    return `${numbers[0]}${operator}${numbers[1]}`;
  };

  return (
    <div id="app">
      <div className="calculator">
        <h1 id="total">{decideTotalValue()}</h1>
        <Digit onClickDigit={onClickDigit}></Digit>
        <Operation
          onClickOperation={onClickOperation}
          onClickClearButton={onClickClearButton}
          onClickEqualOperation={onClickEqualOperation}
        ></Operation>
      </div>
    </div>
  );
};

export default Calculator;
