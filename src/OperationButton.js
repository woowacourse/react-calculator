import React, { Component } from 'react';

class OperationButton extends Component {
  onClickOperator = ({ target }) => {
    this.setState({ operator: target.textContent });
  };

  render() {
    const { children, currentOperator, setOperator } = this.props;
    return (
      <button
        className={'operation' + ((currentOperator === children && ' pressed') || '')}
        onClick={() => {
          setOperator(children);
        }}
      >
        {children}
      </button>
    );
  }
}

export default OperationButton;
