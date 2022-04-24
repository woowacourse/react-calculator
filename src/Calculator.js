import React, { useState, useCallback, useEffect } from 'react';
import OperationButton from './components/OperationButton';
import './Calculator.css';

const MAX_LENGTH = 3;
const DIGIT_LIST = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const OPERATION_LIST = ['/', 'X', '-', '+'];

const Calculator = () => {
  const [numbers, setNumbers] = useState([0, 0]);
  const [operator, setOperator] = useState('');
  const totalNumber = !operator || numbers[1] === 0 ? numbers[0] : numbers[1];

  useEffect(() => {
    const savedState = localStorage.getItem('CALCULATOR_STATE');

    if (savedState) {
      const { numbers: savedNumber, operator: savedOperator } = JSON.parse(savedState);
      setNumbers(savedNumber);
      setOperator(savedOperator);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';

    localStorage.setItem('CALCULATOR_STATE', JSON.stringify({ numbers, operator }));
  };

  const handleAllClearClick = () => {
    setNumbers([0, 0]);
    setOperator('');
  };

  const handleDigitClick = (digit) => {
    const numberIndex = operator === '' ? 0 : 1;
    const newStateNumbers = [...numbers];
    const sign = newStateNumbers[numberIndex] >= 0 ? 1 : -1;
    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(digit) * sign;

    if (Number.isNaN(newStateNumbers[numberIndex])) {
      alert('무한한 숫자는 입력할 수 없어, 입력값을 초기화합니다.');
      setNumbers([0, 0]);
      setOperator('');
      return;
    }

    if (isExceedMaxLength(newStateNumbers[numberIndex])) {
      alert('숫자는 세 자리까지 입력 가능합니다.');
      return;
    }

    setNumbers(newStateNumbers);
  };

  const handleResultClick = () => {
    if (operator === '') {
      alert('연산자를 입력해주세요.');
      return;
    }

    const operatorCollection = {
      '+': () => numbers[0] + numbers[1],
      '-': () => numbers[0] - numbers[1],
      X: () => numbers[0] * numbers[1],
      '/': () => Number.parseInt(numbers[0] / numbers[1], 10),
    };

    const resultNumber = operatorCollection[operator]();
    setNumbers([resultNumber, 0]);
    setOperator('');
  };

  const isExceedMaxLength = (number) => {
    return String(Math.abs(number)).length > MAX_LENGTH && number !== Infinity;
  };

  return (
    <div className="App">
      <div className="calculator">
        <h1 id="total">{Number.isNaN(totalNumber) ? '오류' : totalNumber}</h1>
        <div className="digits flex">
          {DIGIT_LIST.map((digit) => (
            <button
              key={digit}
              className="digit"
              onClick={() => {
                handleDigitClick(digit);
              }}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={handleAllClearClick}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {OPERATION_LIST.map((operation) => (
            <OperationButton key={operation} currentOperator={operator} setOperator={setOperator}>
              {operation}
            </OperationButton>
          ))}
          <button className="operation" onClick={handleResultClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
