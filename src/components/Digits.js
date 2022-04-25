import React from 'react';
import Digit from '../elements/Digit';
import { DIGITS } from '../constants';

const digits = DIGITS;

export default function Digits({ onClickDigit }) {
  return (
    <div className="digits flex">
      {digits.map((digit, index) => {
        return (
          <Digit digit={digit} key={index} onClickDigit={onClickDigit}></Digit>
        );
      })}
    </div>
  );
}
