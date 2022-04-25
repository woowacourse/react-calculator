import React from 'react';

export default function Operator({ onClickOperator, operator }) {
  return (
    <button
      className="operation"
      onClick={() => {
        onClickOperator(operator);
      }}
    >
      {operator}
    </button>
  );
}
