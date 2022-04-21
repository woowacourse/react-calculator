import React, { Component } from 'react';

export default class Screen extends Component {
  render() {
    return <h1 id="total">{this.props.screenNumber}</h1>;
  }
}
