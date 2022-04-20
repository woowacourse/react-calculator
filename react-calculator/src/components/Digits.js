import React, { Component } from 'react';
import Digit from '../elements/Digit';
import { DIGITS } from '../constants';

export default class Digits extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props, digits: DIGITS };
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
