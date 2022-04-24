import { useEffect, useMemo, useState } from 'react';
import '../styles/Calculator.css';
const digitList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operationList = ['/', 'X', '-', '+', '='];

const DEFAULT_FIRST_OPERAND_VALUE = '0';
const DEFAULT_SECOND_OPERAND_VALUE = '';
const DEFAULT_OPERATION_VALUE = null;
const DEFAULT_IS_ERROR_VALUE = false;

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

const hasInput = ({ firstOperand, secondOperand, operation }) => {
  return firstOperand !== '0' || secondOperand !== '' || operation !== null;
};

const computeNextOperand = (currentOperand, digit) => {
  return currentOperand.length >= 3
    ? `${currentOperand.slice(0, -1)}${digit}`
    : `${Number(currentOperand + digit)}`;
};

const Calculator = () => {
  const {
    firstOperand: prevFirstOperand,
    secondOperand: prevSecondOperand,
    operation: prevOperation,
    isError: prevIsError,
  } = useMemo(() => JSON.parse(localStorage.getItem('prevState')), []);

  const [firstOperand, setFirstOperand] = useState(
    prevFirstOperand ?? DEFAULT_FIRST_OPERAND_VALUE,
  );

  const [secondOperand, setSecondOperand] = useState(
    prevSecondOperand ?? DEFAULT_SECOND_OPERAND_VALUE,
  );

  const [operation, setOperation] = useState(
    prevOperation ?? DEFAULT_OPERATION_VALUE,
  );

  const [isError, setIsError] = useState(prevIsError ?? DEFAULT_IS_ERROR_VALUE);

  const onClickDigit = (digit) => {
    setIsError(false);

    if (operation) {
      setSecondOperand((prevSecondOperand) =>
        computeNextOperand(prevSecondOperand, digit),
      );
      return;
    }

    setFirstOperand((prevFirstOperand) =>
      computeNextOperand(prevFirstOperand, digit),
    );
  };

  const onClickOperation = (clickedOperation) => {
    if (clickedOperation !== '=') {
      setOperation(clickedOperation);
      return;
    }

    if (operation !== '=') {
      this.setState({
        operation,
      });
      return;
    }

    const result = computeExpression({
      firstOperand: Number(firstOperand),
      secondOperand: Number(secondOperand),
      operation,
    });

    if (isFinite(result)) {
      setFirstOperand(`${result}`);
      setSecondOperand(DEFAULT_SECOND_OPERAND_VALUE);
      setOperation(DEFAULT_OPERATION_VALUE);

      return;
    }

    setIsError(true);
  };

  const initializeState = () => {
    setFirstOperand(DEFAULT_FIRST_OPERAND_VALUE);
    setSecondOperand(DEFAULT_SECOND_OPERAND_VALUE);
    setOperation(DEFAULT_OPERATION_VALUE);
    setIsError(DEFAULT_IS_ERROR_VALUE);
  };

  const onBeforeUnload = (e) => {
    e.preventDefault();

    localStorage.setItem(
      'prevState',
      JSON.stringify({ firstOperand, secondOperand, operation, isError }),
    );

    if (hasInput({ firstOperand, secondOperand, operation, isError })) {
      e.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [onBeforeUnload]);

  return (
    <>
      <div>숫자는 3자리 까지만 입력이 가능합니다.</div>
      <div className="calculator">
        <h1 id="total">
          {isError
            ? '오류'
            : `${firstOperand}
                ${operation ?? ''}
                ${secondOperand}`}
        </h1>

        <div className="digits flex">
          {digitList.map((digit) => (
            <button
              className="digit"
              onClick={() => onClickDigit(digit)}
              key={digit}
            >
              {digit}
            </button>
          ))}
        </div>

        <div className="modifiers subgrid">
          <button className="modifier" onClick={initializeState}>
            AC
          </button>
        </div>

        <div className="operations subgrid">
          {operationList.map((operation) => (
            <button
              className="operation"
              onClick={() => onClickOperation(operation)}
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
