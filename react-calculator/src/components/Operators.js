import React, { Component } from 'react';
import Operator from '../elements/Operator';

export default class Operators extends Component {
  constructor() {
    super();
    this.state = { operators: ['/', 'X', '-', '+', '='] };
  }

  render() {
    return (
      <div className="operations subgrid">
        {this.state.operators.map((operator, index) => (
          <Operator
            onClickOperator={this.props.onClickOperator}
            operator={operator}
            key={index}
          />
        ))}
      </div>
    );
  }
}
