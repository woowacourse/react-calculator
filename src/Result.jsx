/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

export default class Result extends Component {
  componentDidMount() {}

  render() {
    return <h1 id="total">{this.props.value}</h1>;
  }
}
