/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import Operator from './types';

type CalculatorState = {
  prevNumber: null | number;
  nextNumber: null | number;
  operator: Operator;
  result: string;
};

const operators: Array<Operator> = [Operator.plus, Operator.minus, Operator.multiply, Operator.divide];

// [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const DIGITS = Array.from({ length: 10 }, (_, i) => ({ id: nanoid(), digit: 9 - i }));

const initialState: CalculatorState = {
  prevNumber: null,
  nextNumber: null,
  operator: Operator.empty,
  result: '0',
};

const errorState = (errorMessage: string): CalculatorState => ({
  ...initialState,
  result: errorMessage,
});

function Calculator() {
  const [state, setState] = useState<CalculatorState>({ ...initialState });

  // useCallback
  const plus = (num1: number, num2: number) => num1 + num2;
  const minus = (num1: number, num2: number) => num1 - num2;
  const multiply = (num1: number, num2: number) => num1 * num2;
  const divide = (num1: number, num2: number) => num1 / num2;

  const onClickDigitBtn = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const { prevNumber, nextNumber, operator } = state;
    const { digit } = (target as HTMLElement).dataset;
    if (!digit) return;

    const isPrevNumberTurn = operator === Operator.empty;

    // TODO: 리팩토링 할 것
    if (isPrevNumberTurn) {
      if (prevNumber === null) {
        const _prevNumber = Number(digit);
        setState({ ...state, prevNumber: _prevNumber, result: `${_prevNumber}` });
        return;
      }

      if (`${prevNumber}`.length >= 3) return;
      const _prevNumber = Number(prevNumber + digit);
      setState({ ...state, prevNumber: _prevNumber, result: `${_prevNumber}` });
      return;
    }

    if (nextNumber === null) {
      const _nextNumber = Number(digit);
      setState({ ...state, nextNumber: _nextNumber, result: `${_nextNumber}` });
      return;
    }

    if (`${nextNumber}`.length >= 3) return;
    const _nextNumber = Number(nextNumber + digit);
    setState({ ...state, nextNumber: _nextNumber, result: `${_nextNumber}` });
  };

  const onClickOperator = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: 개행 리팩토링
    const { prevNumber } = state;
    const { operator } = (target as HTMLElement).dataset as { operator: Operator };
    if (!operator) return;
    const isValidOperator = Object.values(Operator).includes(operator);
    if (!isValidOperator) {
      setState({ ...errorState('유효한 연산자가 아닙니다') });
      return;
    }
    if (!prevNumber) {
      setState({ ...errorState('숫자를 먼저 입력해 주세요') });
      return;
    }
    setState({ ...state, operator });
  };

  const onClickCalculateBtn = () => {
    // TODO: 로직 줄이자, 나누자
    const { prevNumber, nextNumber, operator } = state;

    if (!prevNumber) return;
    if (!operator) return;
    if (nextNumber === null) {
      setState({ ...state, operator: Operator.empty });
      return;
    }

    let operatorFn = null;
    switch (operator) {
      case Operator.plus: {
        operatorFn = plus;
        break;
      }
      case Operator.minus: {
        operatorFn = minus;
        break;
      }
      case Operator.multiply: {
        operatorFn = multiply;
        break;
      }
      case Operator.divide: {
        operatorFn = divide;
        break;
      }
      default: {
        operatorFn = null;
      }
    }

    if (operatorFn === null) return;

    const result = Math.floor(operatorFn(prevNumber, nextNumber));

    if (Number.isNaN(result)) {
      setState({ ...errorState('숫자 아님') });
      return;
    }

    if (!Number.isFinite(result)) {
      setState({ ...errorState('오류') });
      return;
    }

    setState({ prevNumber: result, nextNumber: null, operator: Operator.empty, result: `${result}` });
  };

  const { result } = state;

  return (
    <div className="calculator">
      <h1 id="total">{result}</h1>
      <div className="digits flex">
        {DIGITS.map(({ id, digit }) => (
          <DigitButton key={id} onClickDigitBtn={onClickDigitBtn} digit={digit} />
        ))}
      </div>
      <div className="modifiers subgrid">
        <button className="modifier" type="button" onClick={() => setState({ ...initialState })}>
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {operators.map(operator => (
          <OperatorButton key={operator} operator={operator} onClickOperator={onClickOperator} />
        ))}

        <button id="calculate-equal" className="operation" type="button" onClick={onClickCalculateBtn}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
