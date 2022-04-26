import React, { useEffect, useState } from 'react';
import './App.css';

import { AllClearButton, DigitButtons, Display, OperationButtons } from './components';

const initialState = {
  firstOperand: '0',
  secondOperand: '',
  operator: '',
  isError: false,
};

export default function App() {
  const prevState = JSON.parse(localStorage.getItem('state')) || initialState;

  const [firstOperand, setFirstOperand] = useState(prevState.firstOperand);
  const [secondOperand, setSecondOperand] = useState(prevState.secondOperand);
  const [operator, setOperator] = useState(prevState.operator);
  const [isError, setIsError] = useState(prevState.isError);

  useEffect(() => {
    window.localStorage.removeItem('state');
  }, []);

  const handleConfirmBeforeUnload = (e) => {
    e.preventDefault();

    // chrome에서 confirm 추가를 위해서 필요
    e.returnValue = '';
  };

  const handleSaveOnUnload = () => {
    const currentState = { firstOperand, secondOperand, operator, isError };
    window.localStorage.setItem('state', JSON.stringify(currentState));

    window.removeEventListener('beforeunload', handleConfirmBeforeUnload);
  };

  window.addEventListener('beforeunload', handleConfirmBeforeUnload);
  window.addEventListener('pagehide', handleSaveOnUnload);

  const handleAllClear = () => {
    setFirstOperand(initialState.firstOperand);
    setSecondOperand(initialState.secondOperand);
    setOperator(initialState.operator);
    setIsError(initialState.isError);
  };

  const setOperand = (position, value) => {
    if (position === 'first') {
      setFirstOperand(value);
      return;
    }

    setSecondOperand(value);
  };

  const setResult = (result) => {
    handleAllClear();
    setFirstOperand(result);
  };

  const displayContent = isError ? '오류' : `${firstOperand}${operator}${secondOperand}`;

  return (
    <div className="App">
      <div className="calculator">
        <Display displayContent={displayContent} />

        <DigitButtons
          firstOperand={firstOperand}
          secondOperand={secondOperand}
          hasOperator={!!operator}
          setOperand={setOperand}
        />

        <AllClearButton handleAllClear={handleAllClear} />

        <OperationButtons
          firstOperand={firstOperand}
          secondOperand={secondOperand}
          operator={operator}
          setOperator={setOperator}
          setResult={setResult}
          setIsError={setIsError}
        />
      </div>
    </div>
  );
}
