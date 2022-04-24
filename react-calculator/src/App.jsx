import React, { useEffect, useState } from 'react';
import './App.css';
import { MAX_NUMBER_LENGTH, RESULT, KEY_PREV_RESULT } from './constants.js';
import store from './utils/store.js';

import Operations from './components/Operations.jsx';
import Digits from './components/Digits.jsx';
import AllClear from './components/AllClear.jsx';
import Result from './components/Result.jsx';

function App() {
  const prevResult = store.getLocalStorage(KEY_PREV_RESULT);
  const [operation, setOperation] = useState(null);
  const [firstNumber, setFirstNumber] = useState(prevResult || '');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(prevResult || RESULT.RESET);

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
  });

  const onBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';
    if (result === RESULT.RESET) {
      localStorage.removeItem(KEY_PREV_RESULT);
      return;
    }
    store.setLocalStorage(KEY_PREV_RESULT, result);
  };

  const renderCalculatorResult = (calculatedResult) => {
    setResult(calculatedResult);
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
        <Result result={result} />
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
