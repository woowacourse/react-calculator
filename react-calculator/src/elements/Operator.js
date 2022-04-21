import React, { Component } from 'react';

export default class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <button
        className="operation"
        onClick={() => {
          this.props.onClickOperator(this.state.operator);
        }}
      >
        {this.state.operator}
      </button>
    );
  }
}
