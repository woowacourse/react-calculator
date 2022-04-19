import React, { Component } from 'react';

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return <h1 id="total">{this.state.screenNumber}</h1>;
  }
}
