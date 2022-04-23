import React, { Component } from "react";

const digitArray = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

class Digit extends Component {
  render() {
    return (
      <div className="digits flex">
        {digitArray.map((digit) => (
          <button onClick={() => this.props.onClickDigit(digit)} key={digit}>
            {digit}
          </button>
        ))}
      </div>
    );
  }
}

export default Digit;
