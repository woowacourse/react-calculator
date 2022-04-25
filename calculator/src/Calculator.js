import { useCallback, useEffect, useState } from 'react';
import './css/index.css';
import {
  DIGITS,
  FONT_SIZE_STANDARD,
  INFINITY_MESSAGE,
  MAX_CURRENT_LENGTH,
  OPERATORS,
} from './constants';

const initialState = {
  total: 0,
  current: 0,
  operator: '',
  isLastClickOperator: false,
};

const Calculator = () => {
  const [state] = useState(
    JSON.parse(localStorage.getItem('state')) ?? {
      ...initialState,
    }
  );

  const [total, setTotal] = useState(state.total);
  const [current, setCurrent] = useState(state.current);
  const [operator, setOperator] = useState(state.operator);
  const [isLastClickOperator, setIsLastClickOperator] = useState(
    state.isLastClickOperator
  );

  const saveLocalStorage = useCallback(() => {
    localStorage.setItem(
      'state',
      JSON.stringify({ total, current, operator, isLastClickOperator })
    );
  }, [total, current, operator, isLastClickOperator]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveLocalStorage);

    return () => {
      saveLocalStorage();
      window.removeEventListener('beforeunload', saveLocalStorage);
    };
  }, [saveLocalStorage]);

  const handleDigitClick = digitValue => {
    if (current.toString().length > MAX_CURRENT_LENGTH) {
      setCurrent(Infinity);
      return;
    }

    if (isLastClickOperator) {
      enterNewOperand(digitValue);
    }

    if (!isLastClickOperator) {
      concatDigitOperand(digitValue);
    }
  };

  const enterNewOperand = digitValue => {
    setCurrent(digitValue);
    setIsLastClickOperator(false);
  };

  const concatDigitOperand = digitValue => {
    setCurrent(current * 10 + digitValue);
  };

  const handleOperatorClick = operatorValue => {
    updateOperator(operatorValue);

    if (isLastClickOperator) return;

    if (!isOperatorExist()) {
      updateResult(current);
      return;
    }

    const result = calculate(total, current, operator);

    updateResult(result);
  };

  const updateOperator = operatorValue => {
    setOperator(operatorValue === '=' ? '' : operatorValue);
    setIsLastClickOperator(true);
  };

  const updateResult = result => {
    setTotal(result);
    setCurrent(result);
  };

  const isOperatorExist = () => {
    return operator !== '';
  };

  const calculate = (a, b, operator) => {
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

  const handleClear = () => {
    setTotal(initialState.total);
    setCurrent(initialState.current);
    setOperator(initialState.operator);
    setIsLastClickOperator(initialState.isLastClickOperator);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="total">
          <h1
            className={
              current.toString().length >= FONT_SIZE_STANDARD
                ? ' small-total-font'
                : ''
            }
          >
            {current === Infinity ? INFINITY_MESSAGE : current}
          </h1>
        </div>
        <div className="digits flex">
          {DIGITS.map(digit => (
            <button
              key={digit.toString()}
              className="digit"
              onClick={e => handleDigitClick(Number(e.target.textContent))}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={() => handleClear()}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {OPERATORS.map(operator => (
            <button
              className="operation"
              key={operator}
              onClick={e => handleOperatorClick(e.target.textContent)}
            >
              {operator}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
