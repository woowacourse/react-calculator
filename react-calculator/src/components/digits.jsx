import React from 'react';
import { CALCULATOR } from '../constants.js';

function Digits({ handleDigit }) {
  const handleDigitButtonClick = (e) => {
    handleDigit(e.target.textContent);
  };

  return (
    <div className="digits flex" onClick={handleDigitButtonClick}>
      {CALCULATOR.DIGITS.map((digit, index) => (
        <button type="button" className="digit" key={index}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default Digits;
