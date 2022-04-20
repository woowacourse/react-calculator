import React, { Component } from 'react';

import { MAX_DIGIT_LENGTH } from './constants';

export default class DigitButtons extends Component {
  #digitButtons;

  constructor({ state, setState }) {
    super();

    this.state = state;
    this.setState = setState;
  }

  #handleDigitClick = ({ target }) => {
    const number = target.textContent;
    const { operator, secondOperand, firstOperand } = this.state;

    if (operator) {
      this.setState({
        secondOperand: this.#concatOperand(secondOperand, number),
      });
      return;
    }
    this.setState({
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
      <>
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
      </>
    );
  }
}
