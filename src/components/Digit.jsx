import React, { Component } from 'react';

export default class Digit extends Component {
  render() {
    const { digit } = this.props;
    const { onClick } = this.props;

    return (
      <button
        className="digit"
        type="button"
        onClick={() => {
          onClick(digit);
        }}
      >
        {digit}
      </button>
    );
  }
}
