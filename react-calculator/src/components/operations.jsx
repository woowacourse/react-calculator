import React, { Component } from 'react';

class Operations extends Component {
  handleOperationButtonClick = (e) => {
    this.props.setOperation(e.target.textContent);
  };

  handleEqualityButtonClick = () => {
    const { operation } = this.props;
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
  };

  render() {
    return (
      <div className="operations subgrid">
        <button className="operation" onClick={this.handleOperationButtonClick}>
          /
        </button>
        <button className="operation" onClick={this.handleOperationButtonClick}>
          X
        </button>
        <button className="operation" onClick={this.handleOperationButtonClick}>
          -
        </button>
        <button className="operation" onClick={this.handleOperationButtonClick}>
          +
        </button>
        <button className="operation" onClick={this.handleEqualityButtonClick}>
          =
        </button>
      </div>
    );
  }
}

export default Operations;
