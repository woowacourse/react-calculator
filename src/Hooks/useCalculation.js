import { useState, useMemo, useCallback } from 'react';
import { MAX_NUMBER, STORAGE_NAME } from '../Constants';

const isExceedMaxNumber = (number) => number >= MAX_NUMBER && number !== Infinity;

const savedState = JSON.parse(localStorage.getItem(STORAGE_NAME));
const DEFAULT_STATE = {
  numbers: [0, 0],
  operator: '',
};

function useCalculation() {
  const initState = useMemo(() => savedState || DEFAULT_STATE, []);

  const [inputNumbers, setNumbers] = useState([...initState.numbers]);
  const [inputOperator, setOperator] = useState(initState.operator);

  const handleAddDigit = (digit) => {
    const numberIndex = inputOperator === '' ? 0 : 1;
    const newStateNumbers = [...inputNumbers];
    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(digit);

    if (newStateNumbers[numberIndex] === Infinity) {
      alert('무한한 숫자는 입력할 수 없어, 입력값을 초기화합니다.');
      return;
    }

    if (isExceedMaxNumber(newStateNumbers[numberIndex])) {
      alert('숫자는 세 자리까지 입력 가능합니다.');
      return;
    }

    setNumbers(newStateNumbers);
  };

  const handleSetOperator = useCallback((operator) => {
    setOperator(operator);
  }, []);

  const handleCalculationResult = () => {
    if (inputOperator === '') {
      alert('연산자를 입력해주세요.');
      return;
    }

    const operatorCollection = {
      '+': () => inputNumbers[0] + inputNumbers[1],
      '-': () => inputNumbers[0] - inputNumbers[1],
      X: () => inputNumbers[0] * inputNumbers[1],
      '/': () => inputNumbers[0] / inputNumbers[1],
    };

    const resultNumber = Number(operatorCollection[inputOperator]().toFixed(2));
    setNumbers([resultNumber, 0]);
    setOperator('');
  };

  const handleAllClear = useCallback(() => {
    setNumbers([...DEFAULT_STATE.numbers]);
    setOperator(DEFAULT_STATE.operator);
  }, []);

  const totalNumber = useMemo(
    () => (!inputOperator || inputNumbers[1] === 0 ? inputNumbers[0] : inputNumbers[1]),
    [inputNumbers],
  );

  return {
    state: {
      inputNumbers,
      inputOperator,
      totalNumber,
    },
    handler: {
      handleAddDigit,
      handleSetOperator,
      handleCalculationResult,
      handleAllClear,
    },
  };
}

export default useCalculation;
