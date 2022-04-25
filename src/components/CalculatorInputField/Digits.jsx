import React from 'react';
import { DIGITS } from '../../constants';
import Button from '../Button';

function Digits({ handleClickDigit }) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit) => (
        <Button className="digit" handleClick={handleClickDigit} key={digit}>
          {digit}
        </Button>
      ))}
    </div>
  );
}

export default Digits;
