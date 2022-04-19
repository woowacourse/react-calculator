import React from 'react';

class CalculationResult extends React.Component {
  render() {
    const { prevNumber, operator, nextNumber } = this.props.expression;

    return (
      <h1 id="total">{prevNumber ? prevNumber + operator + nextNumber : this.props.result}</h1>
    );
  }
}

export default CalculationResult;
