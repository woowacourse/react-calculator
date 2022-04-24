import React, { Component } from 'react';

export default class Modifier extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <button type="button" className="modifier" onClick={onClick}>
        AC
      </button>
    );
  }
}
