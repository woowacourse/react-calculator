import React, { Component } from "react";

import { SCREEN } from "../constant";

export default class DigitComponent extends Component {
  digitNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  handleDigitButton = ({ target }) => {
    if (
      String(this.props.calculateInfo.firstNumber).length >=
        SCREEN.MAX_TEXT_LENGTH &&
      this.props.calculateInfo.operation === ""
    ) {
      return;
    }

    if (
      String(this.props.calculateInfo.secondNumber).length >=
      SCREEN.MAX_TEXT_LENGTH
    ) {
      return;
    }

    if (this.props.calculateInfo.operation) {
      const prevNumber = this.props.calculateInfo.secondNumber;

      this.props.setCalculateInfo({
        secondNumber: Number(prevNumber + target.textContent),
      });

      return;
    }

    const prevNumber = this.props.calculateInfo.firstNumber;

    this.props.setCalculateInfo({
      firstNumber: isNaN(prevNumber)
        ? target.textContent
        : Number(prevNumber + target.textContent),
    });
  };

  render() {
    return (
      <div className="digits flex" onClick={this.handleDigitButton}>
        {this.digitNumbers.map((digitNumber) => (
          <button key={digitNumber} className="digit">
            {digitNumber}
          </button>
        ))}
      </div>
    );
  }
}
