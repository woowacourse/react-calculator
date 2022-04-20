import React, { Component } from "react";

export default class CalculatorButton extends Component {
  onClickNumber = (e) => {
    if (this.props.result === 0) {
      this.props.setResult(e.target.textContent);
    } else {
      this.props.setResult(this.props.result + e.target.textContent);
    }

    if (this.props.isFirstNumber) {
      this.props.setFirstNumber(
        this.props.firstNumber * 10 + Number(e.target.textContent)
      );
      return;
    }

    this.props.setSecondNumber(this.props.secondNumber + e.target.textContent);
  };

  onClickOperator = (e) => {
    if (this.props.firstNumber === "") return;
    if (e.target.textContent === "=" && this.props.secondNumber === "") return;
    this.props.setResult(this.props.result + e.target.textContent);

    if (e.target.textContent !== "=") {
      this.props.setFirstNumber(this.props.firstNumber);
      this.props.setOperator(e.target.textContent);
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
