import React from "react";

function Operator(props) {
  return (
    <button
      onClick={() => {
        props.onClickOperator(props.operator);
      }}
    >
      {props.operator}
    </button>
  );
}

export default Operator;
