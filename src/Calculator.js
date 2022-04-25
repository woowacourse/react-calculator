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
      secondNumber: this.state.secondNumber + inputNumber,
    });
  };

  onClickOperator = (e) => {
    const inputOperator = e.target.textContent;
    if (this.state.firstNumber === "") return;
    if (inputOperator === "=" && this.state.secondNumber === "") return;

    this.setState({
      result: this.state.result + inputOperator,
    });

    if (inputOperator !== "=") {
      this.setState({
        firstNumber: this.state.firstNumber,
        operator: inputOperator,
        isFirstNumber: false,
      });
      return;
    }

    this.calculate();
  };

  onClickModifier = () => {
    this.initState();
    localStorage.setItem("prevValue", 0);
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

    this.setState({ result: res }, () => {
      this.initState();

      if (res === Infinity || isNaN(res)) {
        this.setState({
          firstNumber: 0,
          result: "오류",
        });
        localStorage.setItem("prevValue", "오류");
        return;
      }

      this.setState({
        firstNumber: res,
        result: res,
      });
      localStorage.setItem("prevValue", res);
    });
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
      <div id="app">
        <div className="calculator">
          <DisplayResult result={this.state.result} />
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
        </div>
      </div>
    );
  }
}
