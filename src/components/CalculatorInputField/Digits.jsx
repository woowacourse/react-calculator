import React from 'react';

function Digits({ handleClickDigit }) {
  return (
    <div className="digits flex">
      {Array(10)
        .fill()
        .map((_, digit) => (
          <button className="digit" key={digit} onClick={handleClickDigit}>
            {9 - digit}
          </button>
        ))}
    </div>
  );
}

export default Digits;
