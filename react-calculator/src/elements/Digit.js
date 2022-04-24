import React from "react";

function Digit({ digit, onClickDigit }) {
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

export default Digit;
