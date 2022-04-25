import React, { useState } from 'react';
import Operator from '../elements/Operator';
import { add, sub, mul, div } from '../utils/operations';
import { OPERATORS, ERROR_MESSAGE } from '../constants';

const operators = OPERATORS;

export default function Operators({
  isNumberStep,
  recordNumber,
  screenNumber,
  setStep,
  setRecordNumber,
  setScreenNumber,
}) {
  const [operator, setOperator] = useState('');

  const initializeCalculator = () => {
    setStep(false);
    setRecordNumber(0);
    setOperator('');
  };

  const onClickOperator = (clickedOperator) => {
    if (clickedOperator !== '=') {
      if (isNumberStep && recordNumber !== 0) {
        alert(ERROR_MESSAGE.OVER_INPUT_NUMBER_COUNT);
        return;
      }
      setStep(false);
      setRecordNumber(screenNumber);
      setOperator(clickedOperator);
      return;
    }

    // '=' 이 눌린 경우
    initializeCalculator();

    switch (operator) {
      case '+':
        setScreenNumber(add(recordNumber, screenNumber));
        break;
      case '-':
        setScreenNumber(sub(recordNumber, screenNumber));
        break;
      case 'X':
        setScreenNumber(mul(recordNumber, screenNumber));
        break;
      case '/':
        if (screenNumber === 0) {
          setScreenNumber(ERROR_MESSAGE.INFINITE_NUMBER);
          return;
        }
        setScreenNumber(div(recordNumber, screenNumber));
        break;
      default:
        break;
    }
  };

  return (
    <div className="operations subgrid">
      {operators.map((operator, index) => (
        <Operator
          onClickOperator={onClickOperator}
          operator={operator}
          key={index}
        />
      ))}
    </div>
  );
}
