import './App.css';
import React, { useEffect, useState } from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import {
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  LOCAL_STORAGE_EXPRESSION_KEY,
  MAX_NUMBER_LENGTH,
} from './constants';

function App() {
  const [expression, setExpression] = useState({
    prevNumber: '',
    operator: '',
    nextNumber: '',
  });

  const handleClickAC = () => {
    setExpression({
      prevNumber: '',
      operator: '',
      nextNumber: '',
    });
  };

  const handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    if (expression.prevNumber === INFINITY_CASE_TEXT) {
      setExpression((prevState) => ({
        ...prevState,
        prevNumber: selectedDigit,
      }));
      return;
    }

    updateNumber(
      expression.operator ? 'nextNumber' : 'prevNumber',
      selectedDigit
    );
  };

  const updateNumber = (numberKey, selectedDigit) => {
    if (expression[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    setExpression((prevState) => ({
      ...prevState,
      [numberKey]: prevState[numberKey] + selectedDigit,
    }));
  };

  const handleClickOperator = ({
    target: { textContent: selectedOperator },
  }) => {
    const { prevNumber, operator } = expression;

    if (prevNumber === INFINITY_CASE_TEXT) return;

    if (selectedOperator !== '=' && operator) {
      alert(ERROR_MESSAGE.ALLOW_ONE_OPERATOR);
      return;
    }

    if (selectedOperator !== '=' && !operator) {
      setExpression((prevState) => ({
        ...prevState,
        operator: selectedOperator,
      }));
      return;
    }

    if (operator) {
      setExpression((prevState) => ({
        prevNumber: calculateExpression(
          prevState.prevNumber,
          prevState.operator,
          prevState.nextNumber
        ),
        operator: '',
        nextNumber: '',
      }));
    }
  };

  const calculateExpression = (prevNumber, operator, nextNumber) => {
    const num1 = Number(prevNumber);
    const num2 = Number(nextNumber);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'X':
        return num1 * num2;
      case '/':
        return num2 === 0 ? INFINITY_CASE_TEXT : Number.parseInt(num1 / num2);
      default:
        alert(ERROR_MESSAGE.STRANGE_OPERATOR(operator));
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    window.addEventListener('unload', handleUnload);

    getLocalStorage();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  const getLocalStorage = () => {
    try {
      const expression = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_EXPRESSION_KEY)
      );
      if (!expression) return;

      setExpression(expression);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_EXPRESSION_KEY);
      alert(ERROR_MESSAGE.FAIL_TO_GET_DATA);
    }
  };

  const handleBeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleUnload = () => {
    localStorage.setItem(
      LOCAL_STORAGE_EXPRESSION_KEY,
      JSON.stringify(this.state)
    );
  };

  return (
    <div id="app">
      <div className="calculator">
        <CalculationResult expression={expression} />
        <CalculatorInputField
          handleClickAC={handleClickAC}
          handleClickDigit={handleClickDigit}
          handleClickOperator={handleClickOperator}
        />
      </div>
    </div>
  );
}

export default App;
