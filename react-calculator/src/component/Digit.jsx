import React, { memo } from "react";

const digitArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const Digit = memo((props) => {
  const { onClickDigit } = props;

  return (
    <div className="digits flex">
      {digitArray.map((digit) => (
        <button onClick={() => onClickDigit(digit)} key={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
});

export default Digit;
