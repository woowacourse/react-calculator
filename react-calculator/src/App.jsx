import React, { useEffect, useState } from 'react';
import './App.css';
import Digits from './components/digits.jsx';
import Operations from './components/operations.jsx';
import { INDIVISIBLE_NUMBER, MAX_NUMBER_LENGTH, RESULT } from './constants.js';

const prevResult = localStorage.getItem('prevResult');

function App() {
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

  const setOperator = (operator) => {
    if (!prevNumber || nextNumber) return;
    setOperation(operator);
  };

  const resetCalculation = () => {
    setOperation('');
    setPrevNumber('');
    setNextNumber('');
  };

  const calculate = () => {
    switch (operation) {
      case '+':
        setResult(Number(prevNumber) + Number(nextNumber));
        break;
      case '-':
        setResult(Number(prevNumber) - Number(nextNumber));
        break;
      case '/':
        if (nextNumber === INDIVISIBLE_NUMBER) {
          setResult(RESULT.ERROR_MESSAGE);
          return;
        }
        setResult(Math.floor(Number(prevNumber) / Number(nextNumber)));
        break;
      case 'X':
        setResult(Number(prevNumber) * Number(nextNumber));
        break;
      default:
        break;
    }
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
        <Operations setOperator={setOperator} calculate={calculate} />
      </div>
    </div>
  );
}

export default App;
