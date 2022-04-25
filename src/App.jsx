import './App.css';
import React, { useEffect, useRef } from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import { LOCAL_STORAGE_EXPRESSION_KEY } from './constants';
import useExpression from './hooks/useExpression';
import { CustomLocalStorage } from './utils/CustomLocalStorage';
import useUnload from './hooks/useUnLoad';

function App() {
  const {
    expression,
    setExpression,
    handleClickAC,
    handleClickDigit,
    handleClickOperator,
  } = useExpression();


  useEffect(() => {
    const expression = CustomLocalStorage.load(LOCAL_STORAGE_EXPRESSION_KEY);
    if (expression) {
      setExpression(expression);
    }
  }, []);

  useUnload(() =>
    CustomLocalStorage.save(LOCAL_STORAGE_EXPRESSION_KEY, expression)
  );
    
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
