import "./App.css";
import React, { Component } from "react";
import Digit from "./component/Digit";
import Operation from "./component/Operation";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ["", ""],
      operator: "",
      calculated: false,
    };
  }

  offset() {
    return this.state.operator === "" ? 0 : 1;
  }

  onClickDigit = (e) => {
    if (this.state.numbers[this.offset()].length >= 3) {
      alert("숫자는 3자리수까지 입력가능합니다");
      return;
    }

    if (this.state.calculated) {
      this.setState({
        numbers: [e.target.innerText, ""],
        operator: "",
        calculated: false,
      });
      return;
    }

    const digit = Number(e.target.innerText);
    const newNumbers = [...this.state.numbers];

    newNumbers[this.offset()] += digit;
    this.setState({
      numbers: newNumbers,
      calculated: false,
    });
  };

  onClickOperation = (e) => {
    if (e.target.innerText === "=") {
      this.onClickEqualOperation();
      return;
    }

    if (this.state.calculated) {
      this.setState({
        numbers: [this.resultRender(), ""],
        operator: e.target.innerText,
        calculated: false,
      });
      return;
    }

    if (!this.state.numbers[0]) {
      alert("숫자를 먼저 입력하세요");
      return;
    }

    if (this.offset() > 0) {
      alert("올바른 입력을 해주세요");
      return;
    }

    this.setState({
      operator: e.target.innerText,
    });
  };

  onClickEqualOperation = () => {
    if (!this.state.numbers[1]) {
      alert("완전한 계산식을 입력하세요");
      return;
    }

    if (this.state.calculated) {
      this.setState({
        numbers: [this.resultRender(), this.state.numbers[1]],
        calculated: true,
      });
      return;
    }

    this.setState({
      calculated: true,
    });
  };

  onClickClearButton = () => {
    this.setState({
      numbers: ["", ""],
      operator: "",
      calculated: false,
    });
  };

  totalRender() {
    return this.state.calculated
      ? this.resultRender()
      : this.numberOperationRender();
  }

  numberOperationRender() {
    if (!this.state.numbers[0]) {
      return "0";
    }

    return `${this.state.numbers[0]}${this.state.operator}${this.state.numbers[1]}`;
  }

  resultRender() {
    if (this.state.operator === "+") {
      return Number(this.state.numbers[0]) + Number(this.state.numbers[1]);
    }
    if (this.state.operator === "X") {
      return Number(this.state.numbers[0]) * Number(this.state.numbers[1]);
    }
    if (this.state.operator === "-") {
      return Number(this.state.numbers[0]) - Number(this.state.numbers[1]);
    }
    if (this.state.operator === "/") {
      return Math.floor(
        Number(this.state.numbers[0]) / Number(this.state.numbers[1])
      );
    }
  }

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <h1 id="total">{this.totalRender()}</h1>
          <Digit onClickDigit={this.onClickDigit}></Digit>
          <Operation
            onClickOperation={this.onClickOperation}
            onClickClearButton={this.onClickClearButton}
          ></Operation>
        </div>
      </div>
    );
  }
}

export default Calculator;
