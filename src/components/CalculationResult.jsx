import React from 'react';

class CalculationResult extends React.Component {
  render() {
    const { prevNumber, operator, nextNumber } = this.props.expression;

    return <h1 id="total">{prevNumber + operator + nextNumber || '0'}</h1>;
  }
}

export default CalculationResult;
