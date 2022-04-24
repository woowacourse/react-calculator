import React, { Component } from 'react';

const calculation = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  X: (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};

export default class OperationButtons extends Component {
  #handleOperatorClick = ({ target }) => {
    const { secondOperand, setOperator } = this.props;
    if (secondOperand) return;

    setOperator(target.textContent);
  };

  #handleResultButton = () => {
    const { secondOperand } = this.props;
    if (!secondOperand) return;

    this.#showResult();
  };

  #showResult() {
    const { triggerError, clearAndSetResult } = this.props;
    const result = this.#calculate();

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      triggerError();

      return;
    }

    clearAndSetResult(String(result));
  }

  #calculate() {
    const { operator, firstOperand, secondOperand } = this.props;

    const calc = calculation[operator];
    return calc(Number(firstOperand), Number(secondOperand));
  }

  render() {
    return (
      <div className="operations subgrid">
        {Object.keys(calculation).map((operator) => (
          <button
            key={operator}
            type="button"
            className="operation"
            onClick={this.#handleOperatorClick}
          >
            {operator}
          </button>
        ))}
        <button
          className="operation result-button"
          type="button"
          onClick={this.#handleResultButton}
        >
          =
        </button>
      </div>
    );
  }
}
