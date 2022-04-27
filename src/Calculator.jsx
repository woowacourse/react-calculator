import React, { useState, useEffect } from 'react';
import { ERROR_MESSAGE, STORAGE_KEY, MAX_DIGIT } from './constants';
import DigitButtons from './components/DigitButtons';
import OperatorButtons from './components/OperatorButtons';
import ACButton from './components/ACButton';

function Calculator() {
  const state = localStorage.getItem(STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY))
    : {
        firstNumber: '',
        secondNumber: '',
        operand: '',
      };

  const [firstNumber, _setFirstNumber] = useState(state.firstNumber);
  const [secondNumber, _setSecondNumber] = useState(state.secondNumber);
  const [operand, setOperand] = useState(state.operand);

  const setNumbers = (inputNumber) => {
    if (firstNumber === ERROR_MESSAGE) clearResult();
    if (operand === '') {
      setFirstNumber(inputNumber);
      return;
    }
    setSecondNumber(inputNumber);
  };

  const setOperators = (inputOperator) => {
    if (firstNumber === ERROR_MESSAGE) clearResult();

    if (inputOperator === '=') {
      calculate();
      return;
    }

    if (operand !== '') return;
    setOperand(inputOperator);
  };

  const setFirstNumber = (value) => {
    if (isOverMaxDigit(firstNumber)) {
      return;
    }
    _setFirstNumber((prevState) => prevState + value);
  };

  const setSecondNumber = (value) => {
    if (isOverMaxDigit(secondNumber)) {
      return;
    }
    _setSecondNumber((prevState) => prevState + value);
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

    _setFirstNumber(Number.isFinite(result) ? String(result) : ERROR_MESSAGE);
    _setSecondNumber('');
    setOperand('');
  };

  const clearResult = () => {
    _setFirstNumber('');
    _setSecondNumber('');
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
        <DigitButtons setNumbers={setNumbers}></DigitButtons>
        <ACButton clearResult={clearResult}></ACButton>
        <OperatorButtons setOperators={setOperators}></OperatorButtons>
      </div>
    </div>
  );
}

export default Calculator;
