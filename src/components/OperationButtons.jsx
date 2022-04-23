import React, { Component } from 'react';

export default class OperationButtons extends Component {
  #calculation;

  constructor() {
    super();

    this.#calculation = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      X: (a, b) => a * b,
      '/': (a, b) => Math.floor(a / b),
    };
  }

  #handleOperatorClick = ({ target }) => {
    if (!target.classList.contains('operation')) return;

    const { secondOperand } = this.props.state;
    if (secondOperand) return;

    this.props.handleParentState({
      operator: target.textContent,
    });
  };

  #handleResultButton = () => {
    const { secondOperand } = this.props.state;
    if (!secondOperand) return;

    this.#showResult();
  };

  #showResult() {
    const result = this.#calculate();

    if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
      this.props.triggerError();

      return;
    }

    this.props.handleParentState({
      ...this.props.initialState,
      firstOperand: String(result),
    });
  }

  #calculate() {
    const { operator, firstOperand, secondOperand } = this.props.state;

    const calc = this.#calculation[operator];
    return calc(Number(firstOperand), Number(secondOperand));
  }

  render() {
    return (
      <div className="operations subgrid">
        {Object.keys(this.#calculation).map((operator) => (
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
