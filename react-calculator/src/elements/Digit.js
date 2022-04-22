import React, { Component } from "react";

export default class Digit extends Component {
  render() {
    return (
      <button
        className="digit"
        onClick={() => {
          this.props.onClickDigit(this.props.digit);
        }}
      >
        {this.props.digit}
      </button>
    );
  }
}
