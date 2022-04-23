import "./App.css";
import React, { Component } from "react";
import Digit from "./component/Digit";
import Operation from "./component/Operation";
import {
  checkMaxNumberLength,
  checkValidEqualOperation,
  checkValidOperation,
} from "./util/validator.js";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ["", ""],
      operator: "",
      calculated: false,
    };
  }

  componentDidMount() {
    const calculationState = localStorage.getItem("calculate-state");

    calculationState && this.setState(JSON.parse(calculationState));
    window.addEventListener("beforeunload", this.onBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }

  onBeforeUnload = (event) => {
    event.preventDefault();
    localStorage.setItem("calculate-state", JSON.stringify(this.state));
    event.returnValue = "";
  };

  offset() {
    return this.state.operator === "" ? 0 : 1;
  }

  onClickDigit = (number) => {
    try {
      checkMaxNumberLength(this.state.numbers, this.offset());
      if (this.state.calculated) {
        this.setState({
          numbers: [number, ""],
          operator: "",
          calculated: false,
        });
        return;
      }

      const digit = Number(number);
      const newNumbers = [...this.state.numbers];

      newNumbers[this.offset()] += digit;
      this.setState({
        numbers: newNumbers,
        calculated: false,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  onClickOperation = (operator) => {
    try {
      if (this.state.calculated) {
        this.setState({
          numbers: [this.resultRender(), ""],
          operator,
          calculated: false,
        });
        return;
      }

      checkValidOperation(this.state.numbers, this.offset());

      this.setState({ operator });
    } catch (err) {
      alert(err.message);
    }
  };

  onClickEqualOperation = () => {
    try {
      checkValidEqualOperation(this.state.numbers);

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
    } catch (err) {
      alert(err.message);
    }
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
    if (this.state.numbers[0] === "") {
      return "0";
    }

    return `${this.state.numbers[0]}${this.state.operator}${this.state.numbers[1]}`;
  }

  resultRender() {
    if (this.state.operator === "+") {
      return Number(this.state.numbers[0]) + Number(this.state.numbers[1]);
    }
    if (this.state.operator === "x") {
      return Number(this.state.numbers[0]) * Number(this.state.numbers[1]);
    }
    if (this.state.operator === "-") {
      return Number(this.state.numbers[0]) - Number(this.state.numbers[1]);
    }
    if (this.state.operator === "/") {
      const result = Math.floor(
        Number(this.state.numbers[0]) / Number(this.state.numbers[1])
      );
      return result === Infinity ? "오류" : result;
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
            onClickEqualOperation={this.onClickEqualOperation}
          ></Operation>
        </div>
      </div>
    );
  }
}

export default Calculator;
