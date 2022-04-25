import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';
import Operator from './types';

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

const arithmeticOperation = {
  plus: (num1: number, num2: number) => num1 + num2,
  minus: (num1: number, num2: number) => num1 - num2,
  multiply: (num1: number, num2: number) => num1 * num2,
  divide: (num1: number, num2: number) => num1 / num2,
};

const operatorMap = {
  [Operator.plus]: arithmeticOperation.plus,
  [Operator.minus]: arithmeticOperation.minus,
  [Operator.multiply]: arithmeticOperation.multiply,
  [Operator.divide]: arithmeticOperation.divide,
};

type CalculatorState = {
  prevNumber: null | number;
  nextNumber: null | number;
  operator: null | Operator;
  result: string;
};

const initialState: CalculatorState = {
  prevNumber: null,
  nextNumber: null,
  operator: null,
  result: '0',
};

const localStorageKey = 'calculator-localstorage-key';

const errorState = (errorMessage: string): CalculatorState => ({
  ...initialState,
  result: errorMessage,
});

const saveCurrentStateBeforeLeave = (event: BeforeUnloadEvent, state: CalculatorState) => {
  event.preventDefault();
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

function Calculator() {
  const [state, setState] = useState<CalculatorState>({ ...initialState });

  useEffect(() => {
    window.addEventListener('beforeunload', e => saveCurrentStateBeforeLeave(e, state));
  }, [state]);

  const handleClickDigitBtn = (digit: number) => {
    const { prevNumber, nextNumber, operator } = state;

    const isPrevNumberTurn = operator === null;
    const targetNumber = isPrevNumberTurn ? prevNumber : nextNumber;

    // 첫번째 피연산자 혹은 두번째 피연산자의 길이가 3을 초과하면 에러를 띄운다
    if (`${targetNumber ?? ''}`.length >= 3) {
      window.alert(ERROR_MESSAGE.MAX_DIGIT);
      return;
    }

    if (isPrevNumberTurn) {
      const newNumber = Number(`${prevNumber ?? ''}${digit}`);
      setState({
        ...state,
        prevNumber: newNumber,
        result: `${newNumber}`,
      });
      return;
    }

    const newNumber = `${nextNumber ?? ''}${digit}`;
    const result = `${prevNumber}${operator}${newNumber}`;
    setState({
      ...state,
      nextNumber: Number(newNumber),
      result,
    });
  };

  const handleClickOperatorBtn = (operator: Operator) => {
    const { prevNumber } = state;

    if (operator === null) return;

    const isValidOperator = Object.values(Operator).includes(operator);
    if (!isValidOperator) {
      setState({ ...errorState(ERROR_MESSAGE.NOT_OPERATOR) });
      return;
    }
    if (prevNumber === null) {
      setState({ ...errorState(ERROR_MESSAGE.INPUT_ORDER) });
      return;
    }

    setState({ ...state, operator, result: `${prevNumber}${operator}` });
  };

  const handleClickCalculateBtn = () => {
    const { prevNumber, nextNumber, operator } = state;

    if (prevNumber === null) return;
    if (operator === null) return;
    if (nextNumber === null) {
      setState({ ...state, operator: null });
      return;
    }

    const operatorFn = operatorMap[operator];
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

    setState({ prevNumber: result, nextNumber: null, operator: null, result: `${result}` });
  };

  const handleClickResetBtn = () => setState({ ...initialState });

  const { result } = state;

  return (
    <div className="calculator">
      <h1 id="total">{result}</h1>
      <div className="digits flex">
        {DIGITS.map(({ id, digit }) => (
          <DigitButton key={id} onClick={handleClickDigitBtn} digit={digit} />
        ))}
      </div>
      <div className="modifiers subgrid">
        <button className="modifier" type="button" onClick={handleClickResetBtn}>
          AC
        </button>
      </div>
      <div className="operations subgrid">
        {operators.map(operator => (
          <OperatorButton
            key={operator}
            isFocused={state.operator === operator}
            operator={operator}
            onClick={handleClickOperatorBtn}
          />
        ))}
        <button id="calculate-equal" className="operation" type="button" onClick={handleClickCalculateBtn}>
          =
        </button>
      </div>
    </div>
  );
}

export default Calculator;
