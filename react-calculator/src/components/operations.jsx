import React from 'react';
import { OPERATIONS, INDIVISIBLE_NUMBER, RESULT } from '../constants.js';
import { add, minus, divide, multiply } from '../utils/calculate.js';

function Operations({ firstNumber, secondNumber, operation, setOperation, resetState, renderCalculatorResult }) {
  const calculate = () => {
    let calculatedResult = 0;

    switch (operation) {
      case '+':
        calculatedResult = add(firstNumber, secondNumber);
        break;
      case '-':
        calculatedResult = minus(firstNumber, secondNumber);
        break;
      case '/':
        if (secondNumber === INDIVISIBLE_NUMBER) {
          calculatedResult = RESULT.ERROR_MESSAGE;
          break;
        }
        calculatedResult = divide(firstNumber, secondNumber);
        break;
      case 'X':
        calculatedResult = multiply(firstNumber, secondNumber);
        break;
      default:
        break;
    }

    return calculatedResult;
  };

  const handleOperationButtonClick = (e) => {
    const operator = e.target.textContent;

    if (operator === '=') {
      const calculatedResult = calculate();
      renderCalculatorResult(calculatedResult);
      resetState();
      return;
    }
    setOperation(operator);
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
