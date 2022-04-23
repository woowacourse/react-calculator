import React, { useEffect, useState } from 'react';
import { ERROR_MESSAGE, STORAGE_KEY } from './constants';

const operation = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  'x': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => Math.floor(firstNumber / secondNumber),
};

function Calculator() {
  const initialValue = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : {
        firstOperand: '',
        secondOperand: '',
        operator: '',
      };

  const [firstOperand, setFirstOperand] = useState(initialValue.firstOperand);
  const [secondOperand, setSecondOperand] = useState(initialValue.secondOperand);
  const [operator, setOperator] = useState(initialValue.operator);

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ firstOperand, secondOperand, operator }));
  };

  window.addEventListener('beforeunload', saveResult);

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', saveResult);
    };
  });

  const handleNumber = (e) => {
    if (firstOperand === ERROR_MESSAGE) this.clearResult();
    if (operator === '') {
      if (isOverThreeDigit(firstOperand)) {
        return;
      }
      setFirstOperand(firstOperand + e.target.dataset.number);
      return;
    }

    if (isOverThreeDigit(secondOperand)) {
      return;
    }
    setSecondOperand(secondOperand + e.target.dataset.number);
  };

  const handleOperation = (e) => {
    if (firstOperand === ERROR_MESSAGE) clearResult();

    if (e.target.dataset.operator === '=') {
      calculate();
      return;
    }

    if (operator !== '') return;
    setOperator(e.target.dataset.operator);
  };

  function isOverThreeDigit(number) {
    return number.length >= 3;
  }

  function calculate() {
    if (!operation[operator]) return;

    const result = operation[operator](+firstOperand, +secondOperand);

    setFirstOperand(Number.isFinite(result) ? String(result) : ERROR_MESSAGE);
    setSecondOperand('');
    setOperator('');
  }

  function clearResult() {
    setFirstOperand('');
    setSecondOperand('');
    setOperator('');
  }

  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">{firstOperand + operator + secondOperand}</h1>
        <div className="digits flex" onClick={handleNumber}>
          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((number) => (
            <button className="digit" data-number={number}>
              {number}
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
