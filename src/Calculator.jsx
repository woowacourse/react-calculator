/* eslint-disable no-param-reassign */

import React, { useState, useEffect } from 'react';
import Digit from './components/Digit';
import Modifier from './components/Modifier';
import Operation from './components/Operation';
import Result from './components/Result';
import calculateResult from './utils/calculateResult';
import { load, save } from './utils/storage';

const DEFAULT_VALUE = { operand: ['0', ''], operator: '', index: 0 };

function Calculator() {
  const [input, setInput] = useState({
    operand: DEFAULT_VALUE.operand,
    operator: DEFAULT_VALUE.operator,
    index: DEFAULT_VALUE.index,
  });

  const handleBeforeUnload = event => {
    event.preventDefault();
    event.returnValue = '';
  };

  const handleUnload = () => {
    save('calculator', input);
  };

  useEffect(() => {
    const localState = load('calculator');

    if (localState) {
      setInput({
        operator: localState.operator,
        index: localState.index,
        operand: localState.operand,
      });
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleUnload]);

  const handleClickDigit = digit => {
    if (input.operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (+(input.operand[input.index] + digit) >= 1000) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
      return;
    }

    switch (input.index) {
      case 0:
        setInput(prevState => {
          return { ...prevState, operand: [String(+(prevState.operand[0] + digit)), ''] };
        });
        break;

      case 1:
        setInput(prevState => {
          return {
            ...prevState,
            operand: [String(+prevState.operand[0]), String(+(prevState.operand[1] + digit))],
          };
        });
        break;

      default:
        break;
    }
  };

  const calculate = (operand, operator) => {
    if (!operator) {
      return;
    }

    const result = calculateResult(operand, operator);

    if (result === Infinity) {
      setInput(prevState => {
        return { ...prevState, operand: ['오류', ''], operator: '' };
      });

      return;
    }

    setInput({
      operator: '',
      index: 0,
      operand: [String(result), ''],
    });
  };

  const handleClickOperation = operator => {
    if (input.operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (operator === '=') {
      calculate(input.operand, input.operator);
      return;
    }

    if (input.operator) {
      return;
    }

    setInput(prevState => {
      return { ...prevState, operator, index: 1 };
    });
  };

  const handleClickModifier = () => {
    setInput({
      operand: DEFAULT_VALUE.operand,
      operator: DEFAULT_VALUE.operator,
      index: DEFAULT_VALUE.index,
    });
  };

  return (
    <div className="calculator">
      <Result operator={input.operator} operand={input.operand} />
      <div className="digits flex">
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(digit => (
          <Digit key={digit} digit={String(digit)} onClick={handleClickDigit} />
        ))}
      </div>
      <div className="modifiers subgrid">
        <Modifier onClick={handleClickModifier} />
      </div>
      <div className="operations subgrid">
        {['/', 'X', '-', '+', '='].map(operatorValue => (
          <Operation key={operatorValue} operator={operatorValue} onClick={handleClickOperation} />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
