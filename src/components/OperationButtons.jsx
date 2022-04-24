import React, { Component } from 'react';

const calculation = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  X: (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};

export default function OperationButtons({
  operator,
  firstOperand,
  secondOperand,
  setOperator,
  triggerError,
  clearAndSetResult,
}) {
  const handleOperatorClick = ({ target }) => {
    if (secondOperand) {
      showResult();
    }

    setOperator(target.textContent);
  };

  const handleResultButton = () => {
    if (!secondOperand) return;

    showResult();
  };

  const showResult = () => {
    const result = calculate();

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      triggerError();

      return;
    }

    clearAndSetResult(String(result));
  };

  const calculate = () => {
    const calc = calculation[operator];

    return calc(Number(firstOperand), Number(secondOperand));
  };

  return (
    <div className="operations subgrid">
      {Object.keys(calculation).map((operator) => (
        <button
          key={operator}
          type="button"
          className="operation"
          onClick={handleOperatorClick}
        >
          {operator}
        </button>
      ))}
      <button
        className="operation result-button"
        type="button"
        onClick={handleResultButton}
      >
        =
      </button>
    </div>
  );
}
