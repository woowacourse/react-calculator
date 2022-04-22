import React, { Component } from "react";

export default class AllClearComponent extends Component {
  handleAllClear = () => {
    this.props.setCalculateInfo({
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    });
  };

  render() {
    return (
      <div className="modifiers subgrid">
        <button className="modifier" onClick={this.handleAllClear}>
          AC
        </button>
      </div>
    );
  }
}
