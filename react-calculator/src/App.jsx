import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Operations from './components/Operations.jsx';
import Digits from './components/Digits.jsx';
import { MAX_NUMBER_LENGTH, RESULT } from './constants.js';
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

  const setClickedNumber = (event) => {
    const number = event.target.textContent;

    if (operation) {
      const secondNumberResult = secondNumber.length === MAX_NUMBER_LENGTH ? secondNumber : secondNumber + number;
      setSecondNumber(secondNumberResult);
      renderCalculatorResult(secondNumberResult);
      return;
    }

    const firstNumberResult = firstNumber.length === MAX_NUMBER_LENGTH ? firstNumber : firstNumber + number;
    setFirstNumber(firstNumberResult);
    renderCalculatorResult(firstNumberResult);
  };

  const resetState = () => {
    setOperation(null);
    setFirstNumber('');
    setSecondNumber('');
  };

  const allClearCalculator = () => {
    renderCalculatorResult(RESULT.RESET);
    resetState();
  };

  return (
    <div id="app">
      <div className="calculator">
        <Result result={result} resultRef={resultRef} />
        <Digits setClickedNumber={setClickedNumber} />
        <AllClear allClearCalculator={allClearCalculator} />
        <Operations
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          operation={operation}
          setOperation={setOperation}
          resetState={resetState}
          renderCalculatorResult={renderCalculatorResult}
        />
      </div>
    </div>
  );
}
export default App;
