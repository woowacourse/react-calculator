import './App.css';
import React, { useEffect, useRef } from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import { LOCAL_STORAGE_EXPRESSION_KEY } from './constants';
import useExpression from './hooks/useExpression';
import { CustomLocalStorage } from './utils/CustomLocalStorage';

function App() {
  const {
    expression,
    setExpression,
    handleClickAC,
    handleClickDigit,
    handleClickOperator,
  } = useExpression();

  const expressionRef = useRef(expression);

  useEffect(() => {
    expressionRef.current = expression;
  }, [expression]);

  useEffect(() => {
    const expression = CustomLocalStorage.load(LOCAL_STORAGE_EXPRESSION_KEY);
    if (expression) {
      setExpression(expression);
    }

    window.addEventListener('beforeunload', handleBeforeunload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      window.removeEventListener('unload', handleUnload);
    };
  }, []);

  const handleBeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  const handleUnload = () => {
    CustomLocalStorage.save(
      LOCAL_STORAGE_EXPRESSION_KEY,
      expressionRef.current
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
