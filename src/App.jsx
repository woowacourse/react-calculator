/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useEffect, useState, useRef } from 'react';
import Button from './components/Button';
import './App.css';

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

export default function App() {
  const expressionRef = useRef();

  const [firstOperand, setFirstOperand] = useState(0);
  const [operator, setOperator] = useState('');
  const [secondOperand, setSecondOperand] = useState(0);
  const [calculationResult, setCalculationResult] = useState(0);

  const calculate = (
    operatorInput,
    { firstOperandInput, secondOperandInput }
  ) => {
    const operation = {
      [OPERATOR.PLUS]: () => firstOperandInput + secondOperandInput,
      [OPERATOR.MINUS]: () => firstOperandInput - secondOperandInput,
      [OPERATOR.MULTIPLY]: () => firstOperandInput * secondOperandInput,
      [OPERATOR.DIVIDE]: () =>
        secondOperandInput === 0
          ? INFINITY_ERROR_TEXT
          : toFixedValue(firstOperandInput / secondOperandInput),
    };

    return operation[operatorInput]();
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();

    e.returnValue = '';
  };

  const handleUnload = (_) => {
    const lastExpression = Number(expressionRef.current.textContent);
    storage.set(CALCULATOR_DATA_KEY, {
      savedFirstOperand: firstOperand,
      savedOperator: operator,
      savedSecondOperand: secondOperand,
      savedCalculationResult: calculationResult,
      lastExpression,
    });
  };

  const handleDigitClick = (e) => {
    const expression = expressionRef.current.textContent;
    const digit = e.target.textContent;

    if (
      isArithmeticOperator(expression) ||
      expression === '0' ||
      expression === INFINITY_ERROR_TEXT
    ) {
      expressionRef.current.textContent = digit;
      return;
    }

    expressionRef.current.textContent += digit;
  };

  const handleModifierClick = (_) => {
    expressionRef.current.textContent = 0;

    setFirstOperand(0);
    setOperator('');
    setSecondOperand(0);
    setCalculationResult(0);
  };

  const handleOperationClick = (e) => {
    const operation = e.target.textContent;
    const expression = expressionRef.current.textContent;

    try {
      validateOperatorIsDuplicated(expression);
    } catch ({ message }) {
      alert(message);
      return;
    }

    if (operation === OPERATOR.EQUAL) {
      const calcResult = calculate(operator, {
        firstOperandInput: firstOperand,
        secondOperandInput: Number(expression),
      });
      expressionRef.current.textContent = calcResult;
      setFirstOperand(Number(expression));

      return;
    }

    expressionRef.current.textContent = operation;
    setFirstOperand(Number(expression));
    setOperator(operation);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (storage.get(CALCULATOR_DATA_KEY)) {
      const {
        savedFirstOperand,
        savedSecondOperand,
        savedOperator,
        savedCalculationResult,
        lastExpression,
      } = storage.get(CALCULATOR_DATA_KEY);

      setFirstOperand(savedFirstOperand);
      setOperator(savedOperator);
      setSecondOperand(savedSecondOperand);
      setCalculationResult(savedCalculationResult);

      expressionRef.current.textContent = lastExpression ?? 0;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  });

  useEffect(() => {
    setFirstOperand(firstOperand);
    setOperator(operator);
    setSecondOperand(secondOperand);
    setCalculationResult(calculationResult);
  }, [firstOperand, secondOperand, operator, calculationResult]);

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
          {CALCULATOR_OPERATOR_LIST.map((operatorText, index) => (
            <Button key={index} className="operation" text={operatorText} />
          ))}
        </div>
      </div>
    </>
  );
}
