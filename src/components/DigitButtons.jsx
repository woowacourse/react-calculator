import React from 'react';
import { MAX_DIGIT_LENGTH } from '../constants';

export default function DigitButtons({
  firstOperand,
  secondOperand,
  hasOperator,
  setOperand,
}) {
  const concatOperand = (currentOperand, number) => {
    if (currentOperand && currentOperand.length >= MAX_DIGIT_LENGTH) {
      return currentOperand;
    }
    if (currentOperand === '0') return number;
    return currentOperand + number;
  };

  const handleDigitClick = (buttonNumber) => {
    if (hasOperator) {
      setOperand('second', concatOperand(secondOperand, buttonNumber));
      return;
    }

    setOperand('first', concatOperand(firstOperand, buttonNumber));
  };

  return (
    <div className="digits flex">
      {Array.from({ length: 10 }).map((_, index) => {
        const buttonNumber = 9 - index;
        return (
          <button
            key={buttonNumber}
            type="button"
            className="digit"
            onClick={() => handleDigitClick(String(buttonNumber))}
          >
            {buttonNumber}
          </button>
        );
      })}
    </div>
  );
}
