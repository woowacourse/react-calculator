import React, { useState, useEffect } from 'react';
import { ERROR_MESSAGE, STORAGE_KEY, MAX_DIGIT } from './constants';

function Calculator() {
  const state = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : {
        firstNumber: '',
        secondNumber: '',
        operand: '',
      };

  const [firstNumber, setFirstNumber] = useState(state.firstNumber);
  const [secondNumber, setSecondNumber] = useState(state.secondNumber);
  const [operand, setOperand] = useState(state.operand);

  const handleNumber = (e) => {
    if (firstNumber === ERROR_MESSAGE) clearResult();
    if (operand === '') {
      _setFirstNumber(e.target.dataset.number);
      return;
    }
    _setSecondNumber(e.target.dataset.number);
  };

  const handleOperation = (e) => {
    if (firstNumber === ERROR_MESSAGE) clearResult();

    if (e.target.dataset.operator === '=') {
      calculate();
      return;
    }

    if (operand !== '') return;
    setOperand(e.target.dataset.operator);
  };

  const _setFirstNumber = (value) => {
    if (isOverMaxDigit(firstNumber)) {
      return;
    }
    setFirstNumber((prevState) => prevState + value);
  };

  const _setSecondNumber = (value) => {
    if (isOverMaxDigit(secondNumber)) {
      return;
    }
    setSecondNumber((prevState) => prevState + value);
  };

  const isOverMaxDigit = (number) => {
    return number.length >= MAX_DIGIT;
  };

  const add = (firstNumber, secondNumber) => {
    return firstNumber + secondNumber;
  };

  const subtract = (firstNumber, secondNumber) => {
    return firstNumber - secondNumber;
  };

  const multiply = (firstNumber, secondNumber) => {
    return firstNumber * secondNumber;
  };

  const divide = (firstNumber, secondNumber) => {
    return Math.floor(firstNumber / secondNumber);
  };

  const operation = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '/': divide,
  };

  const calculate = () => {
    if (!operation[operand]) return;

    const result = operation[operand](+firstNumber, +secondNumber);

    setFirstNumber(Number.isFinite(result) ? String(result) : ERROR_MESSAGE);
    setSecondNumber('');
    setOperand('');
  };

  const clearResult = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperand('');
  };

  const saveResult = (e) => {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ firstNumber, secondNumber, operand }));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', saveResult);

    return () => {
      window.removeEventListener('beforeunload', saveResult);
    };
  });

  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">{firstNumber + operand + secondNumber}</h1>
        <div className="digits flex" onClick={handleNumber}>
          <button className="digit" data-number="9">
            9
          </button>
          <button className="digit" data-number="8">
            8
          </button>
          <button className="digit" data-number="7">
            7
          </button>
          <button className="digit" data-number="6">
            6
          </button>
          <button className="digit" data-number="5">
            5
          </button>
          <button className="digit" data-number="4">
            4
          </button>
          <button className="digit" data-number="3">
            3
          </button>
          <button className="digit" data-number="2">
            2
          </button>
          <button className="digit" data-number="1">
            1
          </button>
          <button className="digit" data-number="0">
            0
          </button>
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
