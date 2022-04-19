import React, { Component } from 'react';
import Digit from '../elements/Digit';

export default class Digits extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props, digits: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] };
  }

  render() {
    return (
      <div className="digits flex">
        {this.state.digits.map((digit, index) => {
          return (
            <Digit
              digit={digit}
              key={index}
              onClickDigit={this.state.onClickDigit}
            ></Digit>
          );
        })}
      </div>
    );
  }
}
