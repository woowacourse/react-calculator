import React, { Component } from 'react';

export default class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return <button className="operation">{this.state.operator}</button>;
  }
}
