import React, { Component } from 'react';
import { CALCULATOR } from '../constants.js';

class Digits extends Component {
  handleDigitButtonClick = (e) => {
    this.props.handleDigit(e.target.textContent);
  };

  render() {
    return (
      <div className="digits flex" onClick={this.handleDigitButtonClick}>
        {CALCULATOR.DIGITS.map((digit, index) => (
          <button className="digit" key={index}>
            {digit}
          </button>
        ))}
      </div>
    );
  }
}

export default Digits;
