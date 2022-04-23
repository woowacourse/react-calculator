import React, { Component } from "react";

import { EXPONENTIAL_LIMIT_POINT, SCREEN } from "../constant";
import OperationButtonComponent from "./OperationButtonComponent";

export default class OperationComponent extends Component {
  operations = ["/", "X", "-", "+"];

  calculateResultNumber = () => {
    const firstNumber = Number(this.props.calculateInfo.firstNumber);
    const secondNumber = Number(this.props.calculateInfo.secondNumber);
    let resultNumber = 0;

    switch (this.props.calculateInfo.operation) {
      case "X":
        resultNumber = firstNumber * secondNumber;
        break;
      case "/":
        resultNumber = firstNumber / secondNumber;
        break;
      case "+":
        resultNumber = firstNumber + secondNumber;
        break;
      case "-":
        resultNumber = firstNumber - secondNumber;
        break;
      default:
        break;
    }

    return resultNumber ?? firstNumber;
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
        {this.operations.map((operation) => {
          return (
            <OperationButtonComponent
              key={operation}
              isFocused={this.props.calculateInfo.operation === operation}
              operation={operation}
            />
          );
        })}
        <button className="operation">=</button>
      </div>
    );
  }
}
