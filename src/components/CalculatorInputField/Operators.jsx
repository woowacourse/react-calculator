import React from 'react';

const OPERATORS = ['/', 'X', '-', '+', '='];

class Operators extends React.Component {
  render() {
    return (
      <div className="operations subgrid">
        {OPERATORS.map((operator) => (
          <button
            className="operation"
            key={operator}
            onClick={this.props.handleClickOperator}
          >
            {operator}
          </button>
        ))}
      </div>
    );
  }
}

export default Operators;
