import React, { useEffect, useState } from 'react';
import '../App.css';
import Digits from './digits.jsx';
import Operations from './operations.jsx';
import { MAX_NUMBER_LENGTH, RESULT } from '../constants.js';

const prevResult = localStorage.getItem('prevResult');
function Calculator() {
  const [result, setResult] = useState(prevResult || RESULT.RESET);
  const [prevNumber, setPrevNumber] = useState(prevResult || '');
  const [nextNumber, setNextNumber] = useState('');
  const [operation, setOperation] = useState('');

  useEffect(() => {
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      if (result === RESULT.RESET) {
        localStorage.clear();
        return;
      }
      localStorage.setItem('prevResult', result);
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  });

  const handleDigit = (number) => {
    if (operation) {
      if (nextNumber.length === MAX_NUMBER_LENGTH) return;
      setNextNumber(nextNumber + number);
      return;
    }
    if (prevNumber.length === MAX_NUMBER_LENGTH) return;
    setPrevNumber(prevNumber + number);
  };

  const handleOperation = (operator) => {
    if (!prevNumber || nextNumber) return;
    setOperation(operator);
  };

  const resetCalculation = () => {
    setOperation('');
    setPrevNumber('');
    setNextNumber('');
  };

  const calculate = () => {
    if (!nextNumber) return;

    let calculationResult;
    switch (operation) {
      case '+':
        calculationResult = Number(prevNumber) + Number(nextNumber);
        break;
      case '-':
        calculationResult = Number(prevNumber) - Number(nextNumber);
        break;
      case '/':
        calculationResult = Math.floor(Number(prevNumber) / Number(nextNumber));
        break;
      case 'X':
        calculationResult = Number(prevNumber) * Number(nextNumber);
        break;
      default:
        break;
    }
    setResult(calculationResult === Infinity ? RESULT.ERROR_MESSAGE : calculationResult);
    resetCalculation();
  };

  const reset = () => {
    resetCalculation();
    setResult(RESULT.RESET);
  };

  return (
    <div id="app">
      <div className="calculator">
        <h1 id="calculator-number">{prevNumber ? prevNumber + operation + nextNumber : result}</h1>
        <Digits handleDigit={handleDigit} />
        <div className="modifiers subgrid">
          <button type="button" className="modifier" onClick={reset}>
            AC
          </button>
        </div>
        <Operations handleOperation={handleOperation} calculate={calculate} />
      </div>
    </div>
  );
}

export default Calculator;
