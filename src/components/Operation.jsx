import React, { Component } from 'react';

export default class Operation extends Component {
  render() {
    const { operator } = this.props;
    const { onClick } = this.props;

    return (
      <button
        type="button"
        className="operation"
        onClick={() => {
          onClick(operator);
        }}
      >
        {operator}
      </button>
    );
  }
}
