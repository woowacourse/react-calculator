import React from 'react';
import { OPERATIONS } from '../constants.js';

function Operations({ setOperation, handleEqualityButtonClick }) {
  const handleOperationButtonClick = (e) => {
    if (e.target.textContent === '=') {
      handleEqualityButtonClick();
      return;
    }
    setOperation(e.target.textContent);
  };

  return (
    <div className="operations subgrid">
      {OPERATIONS.map((operator) => (
        <button className="operation" onClick={handleOperationButtonClick} key={operator}>
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operations;
