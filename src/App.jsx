/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Button from './components/common/Button';

import storage from './storage/storage';
import {
  CALCULATOR_DATA_KEY,
  CALCULATOR_NUMBER_LIST,
  CALCULATOR_OPERATOR_LIST,
  EQUAL,
} from './constants';
import {
  validateOperatorIsDuplicated,
  isArithmeticOperator,
  operations,
} from './utils';

const initialCalcData = {
  firstOperand: 0,
  secondOperand: 0,
  operator: '',
  calculationResult: 0,
  lastExpression: '',
};

const defaultCalcData = storage.get(CALCULATOR_DATA_KEY)
  ? storage.get(CALCULATOR_DATA_KEY)
  : initialCalcData;

function App() {
  const [calcData, setCalcData] = useState(defaultCalcData);
  const expressionRef = useRef();

  function handleDigitClick(e) {
    const expression = expressionRef.current.textContent;
    const digit = e.target.textContent;

    if (isArithmeticOperator(expression) || expression === '0') {
      expressionRef.current.textContent = digit;
      return;
    }

    expressionRef.current.textContent += digit;
  }

  function initialize() {
    expressionRef.current.textContent = 0;
    setCalcData(initialCalcData);
  }

  function handleModifierClick(e) {
    initialize();
  }

  function calculate(secondOperand) {
    const { operator, firstOperand } = calcData;
    const calculationResult = operations[operator](firstOperand, secondOperand);

    expressionRef.current.textContent = calculationResult;
    setCalcData({
      ...calcData,
      secondOperand,
      calculationResult,
    });
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

    if (operation === EQUAL) {
      calculate(Number(expression));
      return;
    }

    expressionRef.current.textContent = operation;
    setCalcData({
      ...calcData,
      firstOperand: Number(expression),
      operator: operation,
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
          {calcData.lastExpression ?? 0}
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
