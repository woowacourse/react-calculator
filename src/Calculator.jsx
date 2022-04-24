import React, { useEffect, useState } from 'react';
import { DIGITS, OPERAND_ERROR_VALUE, OPERAND_MAX_LENGTH, STORAGE_KEY } from './constants';
import { operation } from './util';

function Calculator() {
  const initialValue = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : {
        firstOperand: '',
        secondOperand: '',
        operator: '',
      };

  const [expression, setExpression] = useState(initialValue);

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expression));
  };

  window.addEventListener('beforeunload', saveResult);

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', saveResult);
    };
  });

  const handleNumber = (e) => {
    if (expression.operator === '') {
      if (isOverOperandMaxLength(expression.firstOperand)) {
        return;
      }

      setExpression({
        ...expression,
        firstOperand:
          expression.firstOperand === OPERAND_ERROR_VALUE
            ? e.target.dataset.number
            : expression.firstOperand + e.target.dataset.number,
      });
      return;
    }

    if (isOverOperandMaxLength(expression.secondOperand)) {
      return;
    }
    setExpression({
      ...expression,
      secondOperand: expression.secondOperand + e.target.dataset.number,
    });
  };

  const handleOperation = (e) => {
    if (expression.firstOperand === OPERAND_ERROR_VALUE) return;

    if (e.target.dataset.operator === '=') {
      calculate();
      return;
    }

    if (expression.operator !== '') return;
    setExpression({
      ...expression,
      operator: e.target.dataset.operator,
    });
  };

  function isOverOperandMaxLength(number) {
    return number.length >= OPERAND_MAX_LENGTH;
  }

  function calculate() {
    if (!operation[expression.operator]) return;

    const result = operation[expression.operator](
      +expression.firstOperand,
      +expression.secondOperand,
    );

    setExpression({
      firstOperand: Number.isFinite(result) ? String(result) : OPERAND_ERROR_VALUE,
      secondOperand: '',
      operator: '',
    });
  }

  function clearResult() {
    setExpression({
      firstOperand: '',
      secondOperand: '',
      operator: '',
    });
  }

  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">
          {expression.firstOperand + expression.operator + expression.secondOperand}
        </h1>
        <div className="digits flex" onClick={handleNumber}>
          {DIGITS.map((digit) => (
            <button className="digit" data-number={digit}>
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid" onClick={clearResult}>
          <button className="modifier" id="clear-button">
            AC
          </button>
        </div>
        <div className="operations subgrid" onClick={handleOperation}>
          <button className="operation" data-operator="/">
            /
          </button>
          <button className="operation" data-operator="x">
            X
          </button>
          <button className="operation" data-operator="-">
            -
          </button>
          <button className="operation" data-operator="+">
            +
          </button>
          <button id="calculate-button" data-operator="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
