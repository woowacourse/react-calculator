import React, { Component } from "react";
import DisplayResult from "./component/DisplayResult";
import CalculatorButton from "./component/CalculatorButton";

export default class App extends Component {
  state = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
    result: 0,
  };

  onSetFirstNumber = (number) => {
    this.setState({
      firstNumber: Number(number),
    });
  };

  onSetOperator = (operator) => {
    this.setState({
      operator: operator,
    });
  };

  onSetSecondNumber = (number) => {
    this.setState(
      {
        secondNumber: Number(number),
      },
      () => this.calculate()
    );
  };

  calculate = () => {
    const res = (() => {
      switch (this.state.operator) {
        case "+":
          return this.add();
        case "-":
          return this.sub();
        case "X":
          return this.multiple();
        case "/":
          return this.divide();
        default:
          throw new Error("존재하지 않는 연산자입니다.");
      }
    })();

    this.setState({ result: res }, () => console.log(this.state));
  };

  add() {
    return this.state.firstNumber + this.state.secondNumber;
  }

  sub() {
    return this.state.firstNumber - this.state.secondNumber;
  }

  divide() {
    return Math.floor(this.state.firstNumber / this.state.secondNumber);
  }

  multiple() {
    return this.state.firstNumber * this.state.secondNumber;
  }

  render() {
    return (
      <>
        <div id="app">
          <div className="calculator">
            <DisplayResult />
            <CalculatorButton
              onSetFirstNumber={this.onSetFirstNumber}
              onSetOperator={this.onSetOperator}
              onSetSecondNumber={this.onSetSecondNumber}
              calculate={this.calculate}
            />
          </div>
        </div>
      </>
    );
  }
}
