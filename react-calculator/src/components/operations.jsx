import React, { Component } from 'react';

class Operations extends Component {
  handleOperationButtonClick = (e) => {
    const operation = e.target.textContent;
    this.props.setOperation(operation);
    switch (operation) {
      case '+':
        this.props.add();
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
        <button className="operation" onClick={this.handleOperationButtonClick}>
          =
        </button>
      </div>
    );
  }
}

export default Operations;
