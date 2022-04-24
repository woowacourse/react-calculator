import React, { useState, useEffect, useCallback } from 'react';

import './App.css';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';

import {
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  LOCAL_STORAGE_EXPRESSION_KEY,
  MAX_NUMBER_LENGTH,
  OPERATORS,
} from './constants';
import { calculateExpression } from './util';

const handleBeforeunload = (e) => {
  e.preventDefault();
  e.returnValue = '';
};

function App() {
  const [expression, setExpression] = useState({
    prevNumber: '',
    operator: '',
    nextNumber: '',
  });

  const handleUnload = useCallback(() => {
    localStorage.setItem(
      LOCAL_STORAGE_EXPRESSION_KEY,
      JSON.stringify(expression)
    );
  }, [expression]);

  useEffect(() => {
    try {
      const prevExpression = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_EXPRESSION_KEY)
      );
      if (!prevExpression) return;

      setExpression(prevExpression);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_EXPRESSION_KEY);
      alert(ERROR_MESSAGE.FAIL_TO_GET_DATA);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleUnload]);

  const updateNumber = (numberKey, selectedDigit) => {
    if (expression[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    setExpression((states) => ({
      ...states,
      [numberKey]: `${expression[numberKey]}${selectedDigit}`,
    }));
  };

  const handleClickAC = () => {
    setExpression({
      prevNumber: '',
      operator: '',
      nextNumber: '',
    });
  };

  const handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    const { prevNumber, operator } = expression;

    if (prevNumber === INFINITY_CASE_TEXT) {
      setExpression((prevStates) => ({
        ...prevStates,
        prevNumber: selectedDigit,
      }));
      return;
    }

    updateNumber(operator ? 'nextNumber' : 'prevNumber', selectedDigit);
  };

  const handleClickOperator = ({
    target: { textContent: selectedOperator },
  }) => {
    const { prevNumber, operator, nextNumber } = expression;

    if (
      prevNumber === INFINITY_CASE_TEXT ||
      (selectedOperator === OPERATORS.EQUAL && !operator)
    )
      return;

    if (selectedOperator !== OPERATORS.EQUAL && operator) {
      alert(ERROR_MESSAGE.ALLOW_ONE_OPERATOR);
      return;
    }

    if (selectedOperator !== OPERATORS.EQUAL && !operator) {
      setExpression((prevStates) => ({
        ...prevStates,
        operator: selectedOperator,
      }));
      return;
    }

    const num1 = Number(prevNumber);
    const num2 = Number(nextNumber);
    let expressionResult;

    try {
      expressionResult = `${calculateExpression(
        num1,
        operator,
        nextNumber ? num2 : num1
      )}`;
    } catch (error) {
      alert(error.message);
      return;
    }

    setExpression({
      prevNumber: expressionResult,
      operator: '',
      nextNumber: '',
    });
  };

  return (
    <div id="app">
      <div className="calculator">
        <CalculationResult expression={expression} />
        <CalculatorInputField
          handleClickAC={handleClickAC}
          handleClickDigit={handleClickDigit}
          handleClickOperator={handleClickOperator}
        />
      </div>
    </div>
  );
}

export default App;
