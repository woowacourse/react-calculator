/* eslint-disable no-param-reassign */

import React, { useState, useEffect } from 'react';
import Digit from './components/Digit';
import Modifier from './components/Modifier';
import Operation from './components/Operation';
import Result from './components/Result';
import calculateResult from './utils/calculateResult';

function Calculator() {
  const [operand, setOperand] = useState(['0', '']);
  const [operator, setOperator] = useState('');
  const [index, setIndex] = useState(0);

  const handleBeforeUnload = event => {
    event.preventDefault();
    event.returnValue = '';
  };

  const handleUnload = () => {
    const state = { operand, operator, index };
    localStorage.setItem('state', JSON.stringify(state));
  };

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('state'));
    if (localState) {
      setOperator(localState.operator);
      setIndex(localState.index);
      setOperand(localState.operand);
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
    if (operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (+(operand[index] + digit) >= 1000) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
      return;
    }

    switch (index) {
      case 0:
        setOperand(prevOperand => [String(+(prevOperand[0] + digit)), '']);
        break;

      case 1:
        setOperand(prevOperand => [String(+prevOperand[0]), String(+(prevOperand[1] + digit))]);
        break;

      default:
        break;
    }
  };

  const calculate = (operandFactor, operatorFactor) => {
    if (!operatorFactor) {
      return;
    }

    const result = calculateResult(operandFactor, operatorFactor);

    if (result === Infinity) {
      setOperator('');
      setOperand(['오류', '']);

      return;
    }

    setOperand([String(result), '']);
    setOperator('');
    setIndex(0);
  };

  const handleClickOperation = operatorFactor => {
    if (operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (operatorFactor === '=') {
      calculate(operand, operator);
      return;
    }

    if (operator) {
      return;
    }

    setOperator(operatorFactor);
    setIndex(1);
  };

  const handleClickModifier = () => {
    setOperand(['0', '']);
    setOperator('');
    setIndex(0);
  };

  return (
    <div className="calculator">
      <Result operator={operator} operand={operand} />
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
