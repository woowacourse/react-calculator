import { Component } from "react";
import DisplayResult from "./DisplayResult";

export default class Calculator extends Component {
  state = {
    firstNumber: 0,
    operator: null,
    secondNumber: 0,
    isFirstNumber: true,
    result: 0,
  };

  componentDidMount() {
    const prevValue = localStorage.getItem("prevValue") || 0;
    this.setFirstNumber(Number(prevValue));
    this.setResult(Number(prevValue));

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

  setFirstNumber = (number) => {
    localStorage.setItem("prevValue", number);
    this.setState({ firstNumber: Number(number) });
  };

  setOperator = (operator) => {
    this.setState({ operator });
  };

  setSecondNumber = (number) => {
    localStorage.setItem("prevValue", number);
    this.setState({ secondNumber: Number(number) });
  };

  setResult = (result) => {
    this.setState({ result });
  };

  setIsFirstNumber = (isFirstNumber) => {
    this.setState({ isFirstNumber });
  };

  calculate = () => {
    const { firstNumber, secondNumber, operator } = this.state;

    const res = (() => {
      switch (operator) {
        case "+":
          return firstNumber + secondNumber;
        case "-":
          return firstNumber - secondNumber;
        case "X":
          return firstNumber * secondNumber;
        case "/":
          return Math.trunc(firstNumber / secondNumber);
        default:
          throw new Error("존재하지 않는 연산자입니다.");
      }
    })();

    this.setState({ result: res }, () => {
      this.initState();

      if (res === Infinity || isNaN(res)) {
        localStorage.setItem("prevValue", "오류");
        this.setResult("오류");
        return;
      }

      localStorage.setItem("prevValue", res);
      this.setResult(res);
      this.setFirstNumber(res);
    });
  };

  onClickNumber = (e) => {
    const inputNumber = e.target.textContent;

    if (this.state.result === 0) {
      this.setResult(inputNumber);
    } else {
      this.setResult(this.state.result + inputNumber);
    }

    if (this.state.isFirstNumber) {
      this.setFirstNumber(this.state.firstNumber * 10 + Number(inputNumber));
      return;
    }

    this.setSecondNumber(this.state.secondNumber + inputNumber);
  };

  onClickOperator = (e) => {
    const inputOperator = e.target.textContent;

    if (this.state.firstNumber === "") return;
    if (inputOperator === "=" && this.state.secondNumber === "") return;
    this.setResult(this.state.result + inputOperator);

    if (inputOperator !== "=") {
      this.setFirstNumber(this.state.firstNumber);
      this.setOperator(inputOperator);
      this.setIsFirstNumber(false);
      return;
    }

    this.calculate();
  };

  onClickModifier = () => {
    localStorage.setItem("prevValue", 0);
    this.initState();
  };

  render() {
    return (
      <div className="calculator">
        <DisplayResult result={this.state.result} />
        <div className="digits flex" onClick={this.onClickNumber}>
          {Array.from({ length: 10 }, (_, i) => (
            <button className="digit" key={i}>
              {9 - i}
            </button>
          ))}
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
    );
  }
}
