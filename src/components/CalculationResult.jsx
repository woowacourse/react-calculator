import React from 'react';

function CalculationResult({ expression }) {
  const { prevNumber, operator, nextNumber } = expression;

  return <h1 id="total">{prevNumber + operator + nextNumber || '0'}</h1>;
}

export default CalculationResult;
