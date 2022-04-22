import React, { Component } from "react";

export default class CalculatorButton extends Component {
  onClickNumber = (e) => {
    const inputNumber = e.target.textContent;
    if (this.props.result === 0) {
      this.props.setResult(inputNumber);
    } else {
      this.props.setResult(this.props.result + inputNumber);
    }

    if (this.props.isFirstNumber) {
      this.props.setFirstNumber(
        this.props.firstNumber * 10 + Number(inputNumber)
      );
      return;
    }
    this.props.setSecondNumber(this.props.secondNumber + inputNumber);
  };

  onClickOperator = (e) => {
    const inputOperator = e.target.textContent;
    if (this.props.firstNumber === "") return;
    if (inputOperator === "=" && this.props.secondNumber === "") return;
    this.props.setResult(this.props.result + inputOperator);
    if (inputOperator !== "=") {
      this.props.setFirstNumber(this.props.firstNumber);
      this.props.setOperator(inputOperator);
      this.props.setIsFirstNumber(false);
      return;
    }

    this.props.calculate();
  };

  onClickModifier = () => {
    this.props.initState();
    localStorage.setItem("prevValue", 0);
  };

  render() {
    return (
      <>
        <div className="digits flex" onClick={this.onClickNumber}>
          <button className="digit">9</button>
          <button className="digit">8</button>
          <button className="digit">7</button>
          <button className="digit">6</button>
          <button className="digit">5</button>
          <button className="digit">4</button>
          <button className="digit">3</button>
          <button className="digit">2</button>
          <button className="digit">1</button>
          <button className="digit">0</button>
        </div>
        <div className="modifiers subgrid" onClick={this.onClickModifier}>
          <button className="modifier">AC</button>
        </div>
        <div className="operations subgrid" onClick={this.onClickOperator}>
          <button className="operation">/</button>
          <button className="operation">X</button>
          <button className="operation">-</button>
          <button className="operation">+</button>
          <button className="operation">=</button>
        </div>
      </>
    );
  }
}
