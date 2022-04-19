import React, { Component } from 'react';

export default class Digit extends Component {
  componentDidMount() {}

  render() {
    return (
      <button className="digit" type="button">
        {this.props.value}
      </button>
    );
  }
}
