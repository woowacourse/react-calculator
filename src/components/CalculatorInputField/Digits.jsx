import React from 'react';
import { DIGITS } from '../../constants';

function Digits({ handleClickDigit }) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit) => (
        <button className="digit" key={digit} onClick={handleClickDigit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default Digits;
