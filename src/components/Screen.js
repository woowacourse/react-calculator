import React, { Component } from 'react';

class Screen extends Component {
  render() {
    const { prevNumbers, operator, nextNumbers, sum } = this.props.state;

    return (
      <h1 className="total">{sum === '' ? [...prevNumbers, ...operator, ...nextNumbers] : sum}</h1>
    );
  }
}

export default Screen;
