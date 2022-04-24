import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Operations from './components/Operations.jsx';
import Digits from './components/Digits.jsx';
import { MAX_NUMBER_LENGTH, INDIVISIBLE_NUMBER, RESULT } from './constants.js';
import store from './utils/store.js';
import AllClear from './components/AllClear.jsx';
import Result from './components/Result.jsx';

function App() {
  const resultRef = useRef(null);
  const [operation, setOperation] = useState(null);
  const [firstNumber, setFirstNumber] = useState(
    store.getLocalStorage('prevResult') ? store.getLocalStorage('prevResult') : ''
  );
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(
    store.getLocalStorage('prevResult') ? store.getLocalStorage('prevResult') : RESULT.RESET
  );

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
  });

  const onBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
    if (result === RESULT.RESET) {
      localStorage.removeItem('prevResult');
      return;
    }
    store.setLocalStorage('prevResult', result);
  };

  const renderCalculatorResult = (calculatedResult) => {
    setResult(calculatedResult);
    resultRef.current.textContent = result;
  };

  const setClickedNumber = (number) => {
    if (operation) {
      const secondNumberResult =
        secondNumber.length === MAX_NUMBER_LENGTH ? secondNumber : secondNumber + number;
      setSecondNumber(secondNumberResult);
      renderCalculatorResult(secondNumberResult);
      return;
    }

    const firstNumberResult =
      firstNumber.length === MAX_NUMBER_LENGTH ? firstNumber : firstNumber + number;
    setFirstNumber(firstNumberResult);
    renderCalculatorResult(firstNumberResult);
  };

  const add = () => {
    renderCalculatorResult(Number(firstNumber) + Number(secondNumber));
  };

  const minus = () => {
    renderCalculatorResult(Number(firstNumber) - Number(secondNumber));
  };

  const divide = () => {
    if (secondNumber === INDIVISIBLE_NUMBER) {
      renderCalculatorResult(RESULT.ERROR_MESSAGE);
      return;
    }
    renderCalculatorResult(Math.floor(Number(firstNumber) / Number(secondNumber)));
  };

  const multiply = () => {
    renderCalculatorResult(Number(firstNumber) * Number(secondNumber));
  };

  const resetState = () => {
    setOperation('');
    setFirstNumber('');
    setSecondNumber('');
  };

  const allClear = () => {
    renderCalculatorResult(RESULT.RESET);
    resetState();
  };

  return (
    <div id="app">
      <div className="calculator">
        <Result result={result} resultRef={resultRef} />
        <Digits setClickedNumber={setClickedNumber} />
        <AllClear allClear={allClear} />
        <Operations
          operation={operation}
          setOperation={setOperation}
          add={add}
          minus={minus}
          divide={divide}
          multiply={multiply}
          resetState={resetState}
        />
      </div>
    </div>
  );
}
export default App;
