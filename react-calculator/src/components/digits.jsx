import React from 'react';
import { DIGITS } from '../constants.js';

function Digits({ setClickedNumber }) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit) => (
        <button className="digit" onClick={setClickedNumber} key={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default Digits;
