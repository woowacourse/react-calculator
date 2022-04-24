import { useLayoutEffect, useEffect, useState } from 'react';
import '../styles/Calculator.css';

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

  useLayoutEffect(() => {
    const memoizedState = JSON.parse(localStorage.getItem('prevState'));
    if (!memoizedState) return;
    setState(memoizedState);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleWindowClose);
    return () => window.removeEventListener('beforeunload', handleWindowClose);
  }, [state]);

  const handleWindowClose = (e) => {
    e.preventDefault();
    if (!hasInput(state)) return;

    localStorage.setItem('prevState', JSON.stringify(state));
    return (e.returnValue = '');
  };

  const handleClickDigit = ({ target }) => {
    const { textContent: digit } = target;
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

  const handleClickOperation = ({ target }) => {
    const { textContent: operation } = target;
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
          <button className="digit" onClick={handleClickDigit}>
            9
          </button>
          <button className="digit" onClick={handleClickDigit}>
            8
          </button>
          <button className="digit" onClick={handleClickDigit}>
            7
          </button>
          <button className="digit" onClick={handleClickDigit}>
            6
          </button>
          <button className="digit" onClick={handleClickDigit}>
            5
          </button>
          <button className="digit" onClick={handleClickDigit}>
            4
          </button>
          <button className="digit" onClick={handleClickDigit}>
            3
          </button>
          <button className="digit" onClick={handleClickDigit}>
            2
          </button>
          <button className="digit" onClick={handleClickDigit}>
            1
          </button>
          <button className="digit" onClick={handleClickDigit}>
            0
          </button>
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={handleInitState}>
            AC
          </button>
        </div>
        <div className="operations subgrid">
          <button className="operation" onClick={handleClickOperation}>
            /
          </button>
          <button className="operation" onClick={handleClickOperation}>
            X
          </button>
          <button className="operation" onClick={handleClickOperation}>
            -
          </button>
          <button className="operation" onClick={handleClickOperation}>
            +
          </button>
          <button className="operation" onClick={handleClickOperation}>
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default Calculator;
