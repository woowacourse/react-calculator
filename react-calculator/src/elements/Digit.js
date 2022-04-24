import React from "react";

function Digit(props) {
  return (
    <button
      className="digit"
      onClick={() => {
        props.onClickDigit(props.digit);
      }}
    >
      {props.digit}
    </button>
  );
}

export default Digit;
