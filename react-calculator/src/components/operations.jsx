import React from 'react';
import { CALCULATOR } from '../constants.js';

function Operations({ setOperator, calculate }) {
  const handleOperationButtonClick = (e) => {
    const operator = e.target.textContent;
    if (operator === '=') {
      calculate();
      return;
    }
    setOperator(operator);
  };

  return (
    <div className="operations subgrid" onClick={handleOperationButtonClick}>
      {CALCULATOR.OPERATIONS.map((operator, index) => (
        <button type="button" className="operation" key={index}>
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operations;
