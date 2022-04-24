import React from 'react';

function Digits({ setClickedNumber }) {
  const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="digits flex">
      {digits.map((digit) => (
        <button className="digit" onClick={setClickedNumber} key={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default Digits;
