import React, { Component } from 'react';

class OperatorButtons extends Component {
  onClickOperator = (event) => {
    this.props.func(event);
  };

  render() {
    return (
      <button
        className='operation'
        data-operator={this.props.operator}
        onClick={this.onClickOperator}>
        {this.props.operator}
      </button>
    );
  }
}

export default OperatorButtons;
