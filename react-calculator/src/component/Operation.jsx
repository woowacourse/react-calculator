import React, { Component } from "react";

const operationArray = ["/", "x", "-", "+"];

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
        <div className="operations subgrid">
          {operationArray.map((operation) => (
            <button
              className="operation"
              onClick={() => {
                this.props.onClickOperation(operation);
              }}
              key={operation}
            >
              {operation}
            </button>
          ))}
          <button
            id="calculate-button"
            onClick={this.props.onClickEqualOperation}
          >
            =
          </button>
        </div>
      </>
    );
  }
}

export default Operation;
