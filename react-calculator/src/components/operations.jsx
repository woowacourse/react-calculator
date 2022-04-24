import React from 'react';

function Operations(props) {
  const operations = ['/', 'X', '-', '+', '='];
  const { operation, setOperation, add, minus, divide, multiply, resetState } = props;

  const handleOperationButtonClick = (e) => {
    if (e.target.textContent === '=') {
      handleEqualityButtonClick();
      return;
    }
    setOperation(e.target.textContent);
  };

  const handleEqualityButtonClick = () => {
    switch (operation) {
      case '+':
        add();
        break;
      case '-':
        minus();
        break;
      case '/':
        divide();
        break;
      case 'X':
        multiply();
        break;
      default:
        break;
    }
    resetState();
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
