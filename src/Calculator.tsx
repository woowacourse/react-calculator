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

const ERROR_MESSAGE = {
  NOT_NUMBER: '숫자 아님',
  INFINITY_NUMBER: '오류',
  NOT_OPERATOR: '유효한 연산자가 아닙니다',
  INPUT_ORDER: '숫자를 먼저 입력해 주세요',
  MAX_DIGIT: '최대 세자리 숫자까지만 입력이 됩니다.',
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

  const plus = (num1: number, num2: number) => num1 + num2;
  const minus = (num1: number, num2: number) => num1 - num2;
  const multiply = (num1: number, num2: number) => num1 * num2;
  const divide = (num1: number, num2: number) => num1 / num2;

  const updateNumber = ({ isPrevNumberTurn, newNumber }: { isPrevNumberTurn: boolean; newNumber: number }) => {
    if (isPrevNumberTurn) {
      setState(prevState => ({ ...prevState, prevNumber: newNumber, result: `${newNumber}` }));
      return;
    }
    setState(prevState => ({ ...prevState, nextNumber: newNumber, result: `${newNumber}` }));
  };

  const onClickDigitBtn = (digit: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const { prevNumber, nextNumber, operator } = state;

    const isPrevNumberTurn = operator === Operator.empty;
    const targetNumber = isPrevNumberTurn ? prevNumber : nextNumber;

    if (targetNumber === null) {
      updateNumber({ isPrevNumberTurn, newNumber: digit });
      return;
    }

    if (`${targetNumber}`.length >= 3) {
      window.alert(ERROR_MESSAGE.MAX_DIGIT);
      return;
    }

    const newNumberToString = `${targetNumber}${digit}`;
    updateNumber({ isPrevNumberTurn, newNumber: Number(newNumberToString) });
  };

  const onClickReset = () => setState({ ...initialState });

  const onClickOperator = (operator: Operator) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const { prevNumber } = state;

    if (!operator) return;

    const isValidOperator = Object.values(Operator).includes(operator);
    if (!isValidOperator) {
      setState({ ...errorState(ERROR_MESSAGE.NOT_OPERATOR) });
      return;
    }
    if (!prevNumber) {
      setState({ ...errorState(ERROR_MESSAGE.INPUT_ORDER) });
      return;
    }

    setState(prevState => ({ ...prevState, operator }));
  };

  const getOperatorFn = (operator: Operator) => {
    switch (operator) {
      case Operator.plus: {
        return plus;
      }
      case Operator.minus: {
        return minus;
      }
      case Operator.multiply: {
        return multiply;
      }
      case Operator.divide: {
        return divide;
      }
      default: {
        return null;
      }
    }
  };

  const onClickCalculateBtn = () => {
    const { prevNumber, nextNumber, operator } = state;

    if (!prevNumber) return;
    if (!operator) return;
    if (nextNumber === null) {
      setState(prevState => ({ ...prevState, operator: Operator.empty }));
      return;
    }

    const operatorFn = getOperatorFn(operator);
    if (operatorFn === null) return;

    const result = Math.floor(operatorFn(prevNumber, nextNumber));
    if (Number.isNaN(result)) {
      setState({ ...errorState(ERROR_MESSAGE.NOT_NUMBER) });
      return;
    }
    if (!Number.isFinite(result)) {
      setState({ ...errorState(ERROR_MESSAGE.INFINITY_NUMBER) });
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
        <button className="modifier" type="button" onClick={onClickReset}>
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {operators.map(operator => (
          <OperatorButton
            key={operator}
            isFocused={state.operator === operator}
            operator={operator}
            onClickOperator={onClickOperator}
          />
        ))}
        <button id="calculate-equal" className="operation" type="button" onClick={onClickCalculateBtn}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
