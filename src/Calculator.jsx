/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Digit from './Digit';
import Result from './Result';
import Modifier from './Modifier';
import Operation from './Operation';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      result: '0',
    };
  }

  componentDidMount() {}

  renderDigit(i) {
    return <Digit value={i} />;
  }

  renderOperation(operation) {
    return <Operation value={operation} />;
  }

  renderResult(result) {
    return <Result value={result} />;
  }

  render() {
    return (
      <div className="calculator">
        {this.renderResult(this.state.result)}
        <div className="digits flex">
          {this.renderDigit(0)}
          {this.renderDigit(1)}
          {this.renderDigit(2)}
          {this.renderDigit(3)}
          {this.renderDigit(4)}
          {this.renderDigit(5)}
          {this.renderDigit(6)}
          {this.renderDigit(7)}
          {this.renderDigit(8)}
          {this.renderDigit(9)}
        </div>
        <div className="modifiers subgrid">
          <Modifier />
        </div>
        <div className="operations subgrid">
          {this.renderOperation('/')}
          {this.renderOperation('X')}
          {this.renderOperation('-')}
          {this.renderOperation('+')}
          {this.renderOperation('=')}
        </div>
      </div>
    );
  }
}
