import React from 'react';

class Operators extends React.Component {
  render() {
    return (
      <div className="operations subgrid">
        {['/', 'X', '-', '+', '='].map((operator) => (
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
