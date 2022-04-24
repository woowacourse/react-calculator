import React from 'react';

function Operations(props) {
  const { operation, setOperation, add, minus, divide, multiply, resetState } = props;
  const handleOperationButtonClick = (e) => {
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
      <button className="operation" onClick={handleOperationButtonClick}>
        /
      </button>
      <button className="operation" onClick={handleOperationButtonClick}>
        X
      </button>
      <button className="operation" onClick={handleOperationButtonClick}>
        -
      </button>
      <button className="operation" onClick={handleOperationButtonClick}>
        +
      </button>
      <button className="operation" onClick={handleEqualityButtonClick}>
        =
      </button>
    </div>
  );
}

export default Operations;
