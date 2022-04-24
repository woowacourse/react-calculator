/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import storage from './storage/storage';
import {
  INFINITY_ERROR_TEXT,
  CALCULATOR_DATA_KEY,
  OPERATOR,
  CALCULATOR_NUMBER_LIST,
  CALCULATOR_OPERATOR_LIST,
} from './constants';
import {
  validateOperatorIsDuplicated,
  isArithmeticOperator,
  toFixedValue,
} from './utils';

function App() {
  const expressionRef = React.createRef();
  const [calcData, setCalcData] = useState({
    firstOperand: 0,
    secondOperand: 0,
    operator: '',
    calculationResult: 0,
  });

  function calculate(operator, { firstOperand, secondOperand }) {
    const operation = {
      [OPERATOR.PLUS]: () => firstOperand + secondOperand,
      [OPERATOR.MINUS]: () => firstOperand - secondOperand,
      [OPERATOR.MULTIPLY]: () => firstOperand * secondOperand,
      [OPERATOR.DIVIDE]: () =>
        secondOperand === 0
          ? INFINITY_ERROR_TEXT
          : toFixedValue(firstOperand / secondOperand),
    };

    return operation[operator]();
  }

  function initialize() {
    expressionRef.current.textContent = 0;
    setCalcData({
      firstOperand: 0,
      secondOperand: 0,
      operator: '',
      calculationResult: 0,
    });
  }

  function handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = '';
  }

  function handleUnload() {
    const lastExpression = Number(expressionRef.current.textContent);
    storage.set(CALCULATOR_DATA_KEY, { ...calcData, lastExpression });
  }

  function handleDigitClick(e) {
    const expression = expressionRef.current.textContent;
    const digit = e.target.textContent;

    if (isArithmeticOperator(expression) || expression === '0') {
      expressionRef.current.textContent = digit;
      return;
    }

    expressionRef.current.textContent += digit;
  }

  function handleModifierClick(e) {
    initialize();
  }

  function handleOperationClick(e) {
    const operation = e.target.textContent;
    const expression = expressionRef.current.textContent;

    try {
      validateOperatorIsDuplicated(expression);
    } catch ({ message }) {
      alert(message);
      initialize();
      return;
    }

    if (operation === OPERATOR.EQUAL) {
      const { operator, firstOperand } = calcData;
      const calculationResult = calculate(operator, {
        firstOperand,
        secondOperand: Number(expression),
      });

      expressionRef.current.textContent = calculationResult;
      setCalcData({
        ...calcData,
        secondOperand: Number(expression),
        calculationResult,
      });

      return;
    }

    expressionRef.current.textContent = operation;
    setCalcData({
      ...calcData,
      firstOperand: Number(expression),
      operator: operation,
    });
  }

  useEffect(() => {
    if (storage.get(CALCULATOR_DATA_KEY)) {
      const {
        firstOperand,
        secondOperand,
        operator,
        calculationResult,
        lastExpression,
      } = storage.get(CALCULATOR_DATA_KEY);

      setCalcData({
        firstOperand,
        secondOperand,
        operator,
        calculationResult,
      });

      expressionRef.current.textContent = lastExpression ?? 0;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleBeforeUnload, handleUnload]);

  return (
    <>
      <h1>⚛️ React 계산기 🧮</h1>
      <div className="calculator">
        <h2 id="expression" ref={expressionRef}>
          0
        </h2>
        <div className="digits flex" onClick={handleDigitClick}>
          {CALCULATOR_NUMBER_LIST.map((number, index) => (
            <Button key={index} text={number} className="digit" />
          ))}
        </div>
        <div className="modifiers subgrid" onClick={handleModifierClick}>
          <Button className="modifier" text="AC" />
        </div>
        <div className="operations subgrid" onClick={handleOperationClick}>
          {CALCULATOR_OPERATOR_LIST.map((operator, index) => (
            <Button key={index} className="operation" text={operator} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
