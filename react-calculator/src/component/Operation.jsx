import React, { Component } from "react";

class Operation extends Component {
  render() {
    return (
      <>
        <div className="modifiers subgrid">
          <button
            className="modifier"
            id="clear-button"
            onClick={this.props.onClickClearButton}
          >
            AC
          </button>
        </div>
        <div
          className="operations subgrid"
          onClick={this.props.onClickOperation}
        >
          <button className="operation" data-operator="/">
            /
          </button>
          <button className="operation" data-operator="x">
            X
          </button>
          <button className="operation" data-operator="-">
            -
          </button>
          <button className="operation" data-operator="+">
            +
          </button>
          <button id="calculate-button">=</button>
        </div>
      </>
    );
  }
}

export default Operation;
