import React, { Component } from 'react';

export default class Operation extends Component {
  render() {
    return (
      <button type="button" className="operation">
        {this.props.value}
      </button>
    );
  }
}
