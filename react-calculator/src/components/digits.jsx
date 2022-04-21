import React, { Component } from 'react';

class Digits extends Component {
  handleDigitButtonClick = (e) => {
    this.props.handleDigit(e.target.textContent);
  };

  render() {
    return (
      <div className="digits flex">
        <button className="digit" onClick={this.handleDigitButtonClick}>
          9
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          8
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          7
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          6
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          5
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          4
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          3
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          2
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          1
        </button>
        <button className="digit" onClick={this.handleDigitButtonClick}>
          0
        </button>
      </div>
    );
  }
}

export default Digits;
