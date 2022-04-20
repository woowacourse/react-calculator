import React, { Component } from 'react';

import { MAX_DIGIT_LENGTH } from '../constants';

export default class DigitButtons extends Component {
  #handleDigitClick = ({ target }) => {
    const { state, handleParentState } = this.props;
    const { operator, secondOperand, firstOperand } = state;
    const number = target.textContent;

    if (operator) {
      handleParentState({
        secondOperand: this.#concatOperand(secondOperand, number),
      });
      return;
    }
    handleParentState({
      firstOperand: this.#concatOperand(firstOperand, number),
    });
  };

  #concatOperand(currentOperand, number) {
    if (currentOperand && currentOperand.length >= MAX_DIGIT_LENGTH) {
      return currentOperand;
    }
    if (currentOperand === '0') return number;
    return currentOperand + number;
  }

  render() {
    return (
      <div className="digits flex">
        {Array.from({ length: 10 }).map((val, index) => {
          const buttonNumber = 9 - index;
          return (
            <button
              key={buttonNumber}
              type="button"
              className="digit"
              onClick={this.#handleDigitClick}
            >
              {buttonNumber}
            </button>
          );
        })}
      </div>
    );
  }
}
