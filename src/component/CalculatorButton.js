import React, { Component } from "react";

export default class CalculatorButton extends Component {
  state = {
    firstNumber: "",
    secondNumber: "",
    isFirstNumber: true,
  };

  initState = () => {
    this.setState({
      firstNumber: "",
      secondNumber: "",
      isFirstNumber: true,
    });
  };

  onClickNumber = (e) => {
    if (this.props.result === 0) {
      this.props.onSetResult(e.target.textContent);
    } else {
      this.props.onSetResult(this.props.result + e.target.textContent);
    }

    if (this.state.isFirstNumber) {
      this.setState({
        firstNumber: this.state.firstNumber + e.target.textContent,
      });
      return;
    }

    this.setState({
      secondNumber: this.state.secondNumber + e.target.textContent,
    });
  };

  onClickOperator = (e) => {
    this.props.onSetResult(this.props.result + e.target.textContent);

    if (e.target.textContent !== "=") {
      this.props.onSetFirstNumber(this.state.firstNumber);
      this.props.onSetOperator(e.target.textContent);
      this.setState({
        isFirstNumber: false,
      });
      return;
    }

    this.props.onSetSecondNumber(this.state.secondNumber);
  };

  onClickModifier = () => {
    this.initState();
    this.props.initState();
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
