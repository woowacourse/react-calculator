import React from 'react';

const calculation = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  X: (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};

export default function OperationButtons({
  firstOperand,
  secondOperand,
  operator,
  setOperator,
  setResult,
  setIsError,
}) {
  const handleOperatorClick = ({ target }) => {
    if (secondOperand) return;

    setOperator(target.textContent);
  };

  const calculate = () => {
    const calc = calculation[operator];
    return calc(Number(firstOperand), Number(secondOperand));
  };

  const showResult = () => {
    const result = calculate();

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      setIsError(true);

      return;
    }

    setResult(String(result));
  };

  const handleResultButton = () => {
    if (!secondOperand) return;

    showResult();
  };

  return (
    <div className="operations subgrid">
      {Object.keys(calculation).map((operatorType) => (
        <button
          key={operatorType}
          type="button"
          className="operation"
          onClick={handleOperatorClick}
        >
          {operatorType}
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
