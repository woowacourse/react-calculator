import './App.css';
import React, { useEffect } from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import { ERROR_MESSAGE, LOCAL_STORAGE_EXPRESSION_KEY } from './constants';
import useExpression from './hooks/useExpression';

function App() {
  const {
    expression,
    setExpression,
    handleClickAC,
    handleClickDigit,
    handleClickOperator,
  } = useExpression();

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
      JSON.stringify(expression)
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
