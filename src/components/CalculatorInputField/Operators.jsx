import React from 'react';

const OPERATORS = ['/', 'X', '-', '+', '='];

function Operators({ handleClickOperator }) {
  return (
    <div className="operations subgrid">
      {OPERATORS.map((operator) => (
        <button
          className="operation"
          key={operator}
          onClick={handleClickOperator}
        >
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operators;
