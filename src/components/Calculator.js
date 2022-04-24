import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import '../styles/Calculator.css';

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const OPERATIONS = ['/', 'X', '-', '+', '='];

const computeExpression = ({ firstOperand, secondOperand, operation }) => {
  if (operation === '/') {
    return Math.floor(firstOperand / secondOperand);
  }
  if (operation === 'X') {
    return firstOperand * secondOperand;
  }
  if (operation === '-') {
    return firstOperand - secondOperand;
  }
  if (operation === '+') {
    return firstOperand + secondOperand;
  }
};

const hasInput = ({ firstOperand, secondOperand, operation }) =>
  firstOperand !== '0' || secondOperand !== '' || operation !== null;

const computeNextOperand = (currentOperand, digit) => {
  return currentOperand.length >= 3
    ? `${currentOperand.slice(0, -1)}${digit}`
    : `${Number(currentOperand + digit)}`;
};

const Calculator = () => {
  const [state, setState] = useState({
    firstOperand: '0',
    secondOperand: '',
    operation: null,
    isError: false,
  });

  const ref = useRef(null);

  useLayoutEffect(() => {
    const memoizedState = JSON.parse(localStorage.getItem('prevState'));
    if (!memoizedState) return;
    setState(memoizedState);
  }, []);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, []);

  const handleWindowClose = (e) => {
    e.preventDefault();
    if (!hasInput(ref.current)) return;
    localStorage.setItem('prevState', JSON.stringify(ref.current));
    return (e.returnValue = '');
  };

  const handleClickDigit = (digit) => () => {
    state.operation
      ? setState((prevState) => ({
          ...prevState,
          secondOperand: computeNextOperand(prevState.secondOperand, digit),
        }))
      : setState((prevState) => ({
          ...prevState,
          firstOperand: computeNextOperand(prevState.firstOperand, digit),
        }));
  };

  const handleClickOperation = (operation) => () => {
    if (operation !== '=') {
      setState((prevState) => ({
        ...prevState,
        operation,
      }));
      return;
    }
    const result = computeExpression({
      firstOperand: Number(state.firstOperand),
      secondOperand: Number(state.secondOperand),
      operation: state.operation,
    });

    if (isFinite(result)) {
      setState((prevState) => ({
        ...prevState,
        firstOperand: `${result}`,
        secondOperand: '',
        operation: null,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };

  const handleInitState = () => {
    setState({
      firstOperand: '0',
      secondOperand: '',
      operation: null,
      isError: false,
    });
  };
  return (
    <>
      <div>숫자는 3자리 까지만 입력이 가능합니다.</div>
      <div className="calculator">
        <h1 id="total">
          {state.isError
            ? '오류'
            : `${state.firstOperand}
            ${state.operation ?? ''}
            ${state.secondOperand}`}
        </h1>
        <div className="digits flex">
          {DIGITS.map((digit) => (
            <button
              className="digit"
              onClick={handleClickDigit(digit)}
              key={digit}
            >
              {digit}
            </button>
          ))}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={handleInitState}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          {OPERATIONS.map((operation) => (
            <button
              className="operation"
              onClick={handleClickOperation(operation)}
              key={operation}
            >
              {operation}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calculator;
