import React from 'react';

function Digit(props) {
  return (
    <button
      className="digit"
      type="button"
      onClick={() => {
        props.onClick(props.digit);
      }}
    >
      {props.digit}
    </button>
  );
}

export default Digit;
