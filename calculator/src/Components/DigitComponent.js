import React, { Component } from "react";

import { SCREEN } from "../constant";

export default class DigitComponent extends Component {
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
        <button className="digit">9</button>
        <button className="digit">8</button>
        <button className="digit">7</button>
        <button className="digit">6</button>
        <button className="digit">5</button>
        <button className="digit">4</button>
        <button className="digit">3</button>
        <button className="digit">2</button>
        <button className="digit">1</button>
        <button className="digit">0</button>
      </div>
    );
  }
}
