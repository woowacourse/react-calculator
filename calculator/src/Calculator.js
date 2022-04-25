import { useEffect, useState } from 'react';
import './css/index.css';
import { FONT_SIZE_STANDARD, INFINITY_MESSAGE, MAX_CURRENT_LENGTH, INIT_STATE } from './constants';
import { loadStateLocal, saveStateLocal } from './localStorageManager';

const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const operators = ['/', 'X', '-', '+', '='];

const Calculator = () => {
  const [state, setState] = useState(loadStateLocal());
  const { total, current, operator, isLastClickOperator } = state;

  useEffect(() => {
    saveStateLocal(state);
  });

  const handleDigitClick = (e) => {
    const digitValue = Number(e.target.textContent);

    if (current.toString().length > MAX_CURRENT_LENGTH) {
      setState((prev) => ({ ...prev, current: Infinity }));
      return;
    }

    if (isLastClickOperator) {
      enterNewOperand(digitValue);
    }

    if (!isLastClickOperator) {
      concatDigitOperand(digitValue);
    }
  };

  const enterNewOperand = (digitValue) => {
    setState((prev) => ({ ...prev, current: digitValue, isLastClickOperator: false }));
  };

  const concatDigitOperand = (digitValue) => {
    setState((prev) => ({ ...prev, current: current * 10 + digitValue }));
  };

  const handleOperatorClick = (e) => {
    updateOperator(e);

    if (isLastClickOperator) return;

    if (!isOperatorExist()) {
      calculate(current);
    }

    if (isOperatorExist()) {
      const result = operate(total, current, operator);
      calculate(result);
    }
  };

  const updateOperator = (e) => {
    const operatorValue = e.target.textContent;
    setState((prev) => ({ ...prev, operator: operatorValue, isLastClickOperator: true }));
  };

  const isOperatorExist = () => {
    return operator !== '';
  };

  const operate = (a, b, operator) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case 'X':
        return a * b;
      case '/':
        return a / b;
      default:
        break;
    }
  };

  const calculate = (result) => {
    setState((prev) => ({ ...prev, total: result, current: result }));
  };

  const handleClear = () => {
    setState(INIT_STATE);
  };

  return (
    <div className='App'>
      <div className='calculator'>
        <div className='total'>
          <h1 className={current.toString().length >= FONT_SIZE_STANDARD ? ' small-total-font' : ''}>
            {current === Infinity ? INFINITY_MESSAGE : current}
          </h1>
        </div>
        <div className='digits flex'>
          {digits.map((digit) => (
            <button key={digit.toString()} className='digit' onClick={handleDigitClick}>
              {digit}
            </button>
          ))}
        </div>
        <div className='modifiers subgrid'>
          <button className='modifier' onClick={handleClear}>
            AC
          </button>
        </div>
        <div className='operations subgrid'>
          {operators.map((operator) => (
            <button className='operation' key={operator} onClick={handleOperatorClick}>
              {operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Calculator.prototype = {
  total: Number,
  current: Number,
  operator: String,
  isLastClickOperator: Boolean,
};

export default Calculator;
