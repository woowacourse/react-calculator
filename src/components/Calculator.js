import React, { useCallback, useEffect, useState } from "react";
import NumberButtons from "./NumberButtons";
import OperatorButtons from "./OperandButtons";
import Screen from "./Screen";
import { expressionStorage } from "./store/store";
import {
  NUMBER_LIMIT,
  ERROR_MSG,
  CONFIRM_MSG,
  OPERATOR,
  INIT_CALCULATOR_INFO,
} from "../constants/constant";
import AllClearButton from "./AllClearButton";
import { getCalculateNumber } from "../utils/utils";

const Calculator = () => {
  const [calculatorInfo, setCalculatorInfo] = useState(INIT_CALCULATOR_INFO);
  const { prevNumber, nextNumber, operator, sum } = calculatorInfo;

  useEffect(() => {
    const expression = expressionStorage.getExpression();
    if (!expression) {
      return;
    }
    setCalculatorInfo(expression);
  }, []);

  const confirmExist = useCallback(
    (e) => {
      e.preventDefault();
      e.returnValue = CONFIRM_MSG;
      expressionStorage.setExpression(calculatorInfo);
    },
    [calculatorInfo]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExist);
    return () => {
      window.removeEventListener("beforeunload", confirmExist);
    };
  }, [confirmExist]);

  const onClickNumber = (e) => {
    const number = e.target.textContent;
    const isPrev = operator === "";
    try {
      if (isPrev) {
        if (prevNumber.length >= NUMBER_LIMIT) {
          throw new Error(ERROR_MSG.OVER_NUMBER_LIMIT);
        }
        setCalculatorInfo({
          ...calculatorInfo,
          prevNumber: [...prevNumber, number],
        });
        return;
      }
      if (nextNumber.length >= NUMBER_LIMIT) {
        throw new Error(ERROR_MSG.OVER_NUMBER_LIMIT);
      }
      setCalculatorInfo({
        ...calculatorInfo,
        nextNumber: [...nextNumber, number],
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  const onClickOperator = (e) => {
    const operand = e.target.textContent;
    if (operand === OPERATOR.EQUAL && operator !== "") {
      const prevNumbers = Number(prevNumber.join(""));
      const nextNumbers = Number(nextNumber.join(""));
      const sumTotal = getCalculateNumber(operator, {
        prevNumbers,
        nextNumbers,
      });
      setCalculatorInfo({ ...calculatorInfo, sum: sumTotal });
      return;
    }
    setCalculatorInfo({ ...calculatorInfo, operator: operand });
  };

  const onClickAllClear = () => {
    setCalculatorInfo(INIT_CALCULATOR_INFO);
  };

  return (
    <div id="app">
      <div className="calculator">
        <Screen info={calculatorInfo} />
        <NumberButtons info={calculatorInfo} onClick={onClickNumber} />
        <AllClearButton onClick={onClickAllClear} />
        <OperatorButtons onClick={onClickOperator} />
      </div>
    </div>
  );
};

export default Calculator;
