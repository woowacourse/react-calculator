import React from 'react';

function Operations({ setOperation, handleEqualityButtonClick }) {
  const operations = ['/', 'X', '-', '+', '='];

  const handleOperationButtonClick = (e) => {
    if (e.target.textContent === '=') {
      handleEqualityButtonClick();
      return;
    }
    setOperation(e.target.textContent);
  };

  return (
    <div className="operations subgrid">
      {operations.map((operator) => (
        <button className="operation" onClick={handleOperationButtonClick} key={operator}>
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operations;
