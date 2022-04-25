import React, { Component } from "react";
import DisplayResult from "./component/DisplayResult";

export default class App extends Component {
  state = {
    firstNumber: 0,
    operator: null,
    secondNumber: 0,
    isFirstNumber: true,
    result: 0,
  };

  componentDidMount() {
    const prevValue = localStorage.getItem("prevValue") || 0;
    this.setState({
      firstNumber: Number(prevValue),
      result: Number(prevValue),
    });

    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
  }

  initState = () => {
    this.setState({
      firstNumber: 0,
      operator: null,
      secondNumber: 0,
      isFirstNumber: true,
      result: 0,
    });
  };

  onClickNumber = (e) => {
    const inputNumber = e.target.textContent;
    const resultNumber =
      this.state.result === 0 ? inputNumber : this.state.result + inputNumber;
    this.setState({
      result: resultNumber,
    });

    if (this.state.isFirstNumber) {
      this.setState({
        firstNumber: this.state.firstNumber * 10 + Number(inputNumber),
      });
      return;
    }

    this.setState({
      secondNumber: this.state.secondNumber * 10 + Number(inputNumber),
    });
  };

  onClickOperator = (e) => {
    if (this.state.firstNumber === "") return;

    const inputOperator = e.target.textContent;
    if (inputOperator === "=" && this.state.secondNumber === "") return;

    if (inputOperator !== "=") {
      this.setState({
        result: this.state.result + inputOperator,
        firstNumber: this.state.firstNumber,
        operator: inputOperator,
        isFirstNumber: false,
      });
      return;
    }

    this.onCalculate();
  };

  onClickModifier = () => {
    this.initState();
    localStorage.setItem("prevValue", 0);
  };

  onCalculate = () => {
    const res = this.calculateValue();

    if (res === Infinity || isNaN(res)) {
      this.setState({
        firstNumber: 0,
        secondNumber: 0,
        result: "오류",
        operator: null,
        isFirstNumber: true,
      });
      localStorage.setItem("prevValue", "오류");
      return;
    }

    this.setState({
      firstNumber: res,
      secondNumber: 0,
      result: res,
      operator: null,
      isFirstNumber: true,
    });
    localStorage.setItem("prevValue", res);
  };

  calculateValue() {
    return (() => {
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
  }

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
      <div id="app">
        <div className="calculator">
          <DisplayResult result={this.state.result} />
          <div className="digits flex" onClick={this.onClickNumber}>
            {Array.from({ length: 10 }, (v, i) => (
              <button className="digit" key={9 - i}>
                {9 - i}
              </button>
            ))}
          </div>
          <div className="modifiers subgrid" onClick={this.onClickModifier}>
            <button className="modifier">AC</button>
          </div>
          <div className="operations subgrid" onClick={this.onClickOperator}>
            {Array.from(["/", "X", "-", "+", "="], (v, i) => (
              <button className="digit" key={v}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
