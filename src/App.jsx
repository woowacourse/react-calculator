import React, { useState, useEffect } from 'react';

import './App.css';

import AllClearButton from './components/AllClearButton';
import DigitButtons from './components/DigitButtons';
import OperationButtons from './components/OperationButtons';

const initialState = {
  firstOperand: '0',
  secondOperand: '',
  operator: '',
  isError: false,
};

function App() {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem('state')) || { ...initialState }
  );

  const handleBeforeUnload = (e) => {
    e.preventDefault();

    // chorme에서 confirm 추가를 위해서 필요
    e.returnValue = '';
  };

  const triggerError = () => {
    setState({ ...initialState, isError: true });
  };

  const setOperandValue = (operand, value) => {
    setState((prevState) => ({
      ...prevState,
      [operand === 'first' ? 'firstOperand' : 'secondOperand']: value,
    }));
  };

  const setOperatorValue = (value) => {
    setState((prevState) => ({ ...prevState, operator: value }));
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  const clearAndSetResultValue = (value) => {
    setState({ ...initialState, firstOperand: value });
  };

  useEffect(() => {
    window.localStorage.removeItem('state');

    window.addEventListener('beforeunload', handleBeforeUnload);

    window.addEventListener('pagehide', () => {
      const { firstOperand, operator } = state;

      if (firstOperand !== '0' || operator) {
        window.localStorage.setItem('state', JSON.stringify(state));
      }

      window.removeEventListener('beforeunload', handleBeforeUnload);
    });
  }, []);

  return (
    <div className="App">
      <div className="calculator">
        {state.isError ? (
          <h1 id="total">오류</h1>
        ) : (
          <h1 id="total">
            {state.firstOperand}
            {state.operator}
            {state.secondOperand}
          </h1>
        )}
        <DigitButtons
          operator={state.operator}
          firstOperand={state.firstOperand}
          secondOperand={state.secondOperand}
          setOperand={setOperandValue}
        />
        <AllClearButton clearState={clearState} />
        <OperationButtons
          operator={state.operator}
          firstOperand={state.firstOperand}
          secondOperand={state.secondOperand}
          setOperator={setOperatorValue}
          clearAndSetResult={clearAndSetResultValue}
          triggerError={triggerError}
        />
      </div>
    </div>
  );
}

export default App;
