import React, { Component } from 'react';
import { CALCULATOR } from '../constants.js';

class Operations extends Component {
  confirmOperation = () => {
    const { operation, resetState } = this.props;
    switch (operation) {
      case '+':
        this.props.add();
        break;
      case '-':
        this.props.minus();
        break;
      case '/':
        this.props.divide();
        break;
      case '*':
        this.props.multiply();
        break;
      default:
        break;
    }
    resetState();
  };

  OperationButtonClick = (e) => {
    const operation = e.target.textContent;
    if (operation === '=') {
      this.confirmOperation();
      return;
    }
    this.props.setOperation(operation);
  };

  render() {
    return (
      <div className="operations subgrid" onClick={this.handleOperationButtonClick}>
        {CALCULATOR.OPERATIONS.map((operation, index) => (
          <button className="operation" key={index}>
            {operation}
          </button>
        ))}
      </div>
    );
  }
}

export default Operations;
