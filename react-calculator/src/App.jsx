import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Digits from './components/digits.jsx';
import Operations from './components/operations.jsx';
import { MAX_NUMBER_LENGTH, INDIVISIBLE_NUMBER, RESULT } from './constants.js';
import store from './utils/store.js';

function App() {
  const resultRef = useRef(null);
  const [operation, setOperation] = useState(null);
  const [firstNumber, setFirstNumber] = useState(
    store.getLocalStorage('prevResult') ? store.getLocalStorage('prevResult') : ''
  );
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState(
    store.getLocalStorage('prevResult') ? store.getLocalStorage('prevResult') : 0
  );

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);

    return function cleanup() {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  const renderCalculatorNumber = (calculatedResult) => {
    setResult(calculatedResult);
    resultRef.current.textContent = result;
  };

  const onBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = '';
    if (result === '' || result === RESULT.RESET) return;
    store.setLocalStorage('prevResult', result);
  };

  const handleDigit = (number) => {
    if (operation) {
      const secondNumberResult =
        secondNumber.length === MAX_NUMBER_LENGTH ? secondNumber : secondNumber + number;
      setSecondNumber(secondNumberResult);
      renderCalculatorNumber(secondNumberResult);
      return;
    }

    const firstNumberResult =
      firstNumber.length === MAX_NUMBER_LENGTH ? firstNumber : firstNumber + number;
    setFirstNumber(firstNumberResult);
    renderCalculatorNumber(firstNumberResult);
  };

  const setOperations = (selectedOperation) => {
    setOperation(selectedOperation);
  };

  const add = () => {
    renderCalculatorNumber(Number(firstNumber) + Number(secondNumber));
  };

  const minus = () => {
    renderCalculatorNumber(Number(firstNumber) - Number(secondNumber));
  };

  const divide = () => {
    if (secondNumber === INDIVISIBLE_NUMBER) {
      renderCalculatorNumber(RESULT.ERROR_MESSAGE);
      return;
    }
    renderCalculatorNumber(Math.floor(Number(firstNumber) / Number(secondNumber)));
  };

  const multiply = () => {
    renderCalculatorNumber(Number(firstNumber) * Number(secondNumber));
  };

  const resetState = () => {
    setOperation('');
    setFirstNumber('');
    setSecondNumber('');
  };

  const handleModifierButtonClick = () => {
    renderCalculatorNumber(RESULT.RESET);
    resetState();
  };

  return (
    <div id="app">
      <div className="calculator">
        <h1 id="calculator-number" ref={resultRef}>
          {result}
        </h1>

        <Digits handleDigit={handleDigit} />

        <div className="modifiers subgrid">
          <button className="modifier" onClick={handleModifierButtonClick}>
            AC
          </button>
        </div>

        <Operations
          operation={operation}
          setOperation={setOperations}
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
