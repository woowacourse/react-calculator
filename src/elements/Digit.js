import React from 'react';

export default function Digit({ digit, onClickDigit }) {
  return (
    <button
      className="digit"
      onClick={() => {
        onClickDigit(digit);
      }}
    >
      {digit}
    </button>
  );
}
