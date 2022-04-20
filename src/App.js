import React, { Component } from "react";
import DisplayResult from "./component/DisplayResult";
import CalculatorButton from "./component/CalculatorButton";

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
    this.setFirstNumber(prevValue);
    this.setResult(prevValue);
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
      localStorage.setItem(
        "prevValue",
        this.state.isFirstNumber
          ? this.state.firstNumber
          : this.state.secondNumber
      );
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

  setFirstNumber = (number) => {
    this.setState({
      firstNumber: Number(number),
    });
  };

  setOperator = (operator) => {
    this.setState({ operator });
  };

  setSecondNumber = (number) => {
    this.setState({
      secondNumber: Number(number),
    });
  };

  setResult = (result) => {
    this.setState({ result });
  };

  setIsFirstNumber = (isFirstNumber) => {
    this.setState({ isFirstNumber });
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
      this.setFirstNumber(res);
      this.setResult(res);
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
      <>
        <div id="app">
          <div className="calculator">
            <DisplayResult result={this.state.result} />
            <CalculatorButton
              setFirstNumber={this.setFirstNumber}
              setOperator={this.setOperator}
              setSecondNumber={this.setSecondNumber}
              setIsFirstNumber={this.setIsFirstNumber}
              calculate={this.calculate}
              setResult={this.setResult}
              result={this.state.result}
              initState={this.initState}
              isFirstNumber={this.state.isFirstNumber}
              firstNumber={this.state.firstNumber}
              secondNumber={this.state.secondNumber}
            />
          </div>
        </div>
      </>
    );
  }
}
