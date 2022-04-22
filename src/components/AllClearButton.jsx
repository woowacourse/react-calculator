import React, { Component } from 'react';

export default class AllClearButton extends Component {
  #handleAllClear = () => {
    const { handleParentState } = this.props;
    handleParentState({
      firstOperand: '0',
      secondOperand: '',
      operator: null,
      isError: false,
    });
  };

  render() {
    return (
      <div className="modifiers subgrid">
        <button type="button" className="modifier" onClick={this.#handleAllClear}>
          AC
        </button>
      </div>
    );
  }
}
