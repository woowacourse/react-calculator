import React from "react";

function Operator({ onClickOperator, operator, clicked }) {
  return (
    <button
      className={`operation ${clicked ? "clicked" : ""}`}
      onClick={() => {
        onClickOperator(operator);
      }}
    >
      {operator}
    </button>
  );
}

export default Operator;
