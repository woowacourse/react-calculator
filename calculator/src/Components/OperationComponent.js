import React, { Component } from "react";

import { EXPONENTIAL_LIMIT_POINT, SCREEN } from "../constant";

export default class OperationComponent extends Component {
  calculateResultNumber = () => {
    const firstNumber = Number(this.props.calculateInfo.firstNumber);
    const secondNumber = Number(this.props.calculateInfo.secondNumber);
    const calculateMethod = {
      X: firstNumber * secondNumber,
      "/": firstNumber / secondNumber,
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
    };

    return calculateMethod[this.props.calculateInfo.operation] || firstNumber;
  };

  generateResultNumber(number) {
    if (
      String(number).length > SCREEN.MAX_TEXT_LENGTH &&
      Number.isFinite(number)
    ) {
      return number.toExponential(EXPONENTIAL_LIMIT_POINT);
    }

    if (Number.isFinite(number)) {
      return number;
    }

    return SCREEN.ERROR_MESSAGE;
  }

  canCalculate(target) {
    return (
      target.textContent === "=" && this.props.calculateInfo.secondNumber !== ""
    );
  }

  handleOperationButton = ({ target }) => {
    if (this.canCalculate(target)) {
      const resultNumber = this.calculateResultNumber();

      this.props.setCalculateInfo({
        firstNumber: this.generateResultNumber(resultNumber),
        operation: "",
        secondNumber: "",
      });

      return;
    }

    this.props.setCalculateInfo({
      operation: target.textContent,
    });
  };

  render() {
    return (
      <div className="operations subgrid" onClick={this.handleOperationButton}>
        <button
          className={
            this.props.calculateInfo.operation === "/"
              ? "operation--focused"
              : "operation"
          }
        >
          /
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "X"
              ? "operation--focused"
              : "operation"
          }
        >
          X
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "-"
              ? "operation--focused"
              : "operation"
          }
        >
          -
        </button>
        <button
          className={
            this.props.calculateInfo.operation === "+"
              ? "operation--focused"
              : "operation"
          }
        >
          +
        </button>
        <button className="operation">=</button>
      </div>
    );
  }
}
