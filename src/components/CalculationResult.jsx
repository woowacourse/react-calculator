import React from 'react';

function CalculationResult({
  expression: { prevNumber, operator, nextNumber },
}) {
  return <h1 id="total">{prevNumber + operator + nextNumber || '0'}</h1>;
}

export default CalculationResult;
