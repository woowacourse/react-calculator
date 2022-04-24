import React, { Component } from 'react';

export default class Result extends Component {
  render() {
    return (
      <h1 id="total">
        {this.props.operand[0]}
        {this.props.operator}
        {this.props.operand[1]}
      </h1>
    );
  }
}
