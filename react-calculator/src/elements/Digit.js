import React, { Component } from 'react';

export default class Digit extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
  render() {
    return (
      <button
        className="digit"
        onClick={() => {
          this.state.changeScreenNumber(this.state.digit);
        }}
      >
        {this.state.digit}
      </button>
    );
  }
}
