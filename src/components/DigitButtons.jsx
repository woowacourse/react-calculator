import React from 'react';

import { MAX_DIGIT_LENGTH } from '../constants';

export default function DigitButtons({
  operator,
  firstOperand,
  secondOperand,
  setOperand,
}) {
  const handleDigitClick = ({ target }) => {
    const number = target.textContent;

    if (operator) {
      setOperand('second', concatOperand(secondOperand, number));

      return;
    }

    setOperand('first', concatOperand(firstOperand, number));
  };

  const concatOperand = (currentOperand, number) => {
    if (currentOperand && currentOperand.length >= MAX_DIGIT_LENGTH) {
      return currentOperand;
    }
    if (currentOperand === '0') return number;
    return currentOperand + number;
  };

  return (
    <div className="digits flex">
      {Array.from({ length: 10 }).map((val, index) => {
        const buttonNumber = 9 - index;
        return (
          <button
            key={buttonNumber}
            type="button"
            className="digit"
            onClick={handleDigitClick}
          >
            {buttonNumber}
          </button>
        );
      })}
    </div>
  );
}
