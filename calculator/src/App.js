import React, { Component } from "react";

import "./App.css";

import DigitComponent from "./Components/DigitComponent";
import OperationComponent from "./Components/OperationComponent";
import AllClearComponent from "./Components/AllClearComponent";

import { SCREEN } from "./constant";

export default class App extends Component {
  state = {
    firstNumber: 0,
    operation: "",
    secondNumber: "",
  };

  convertToLocaleString = (number) => number.toLocaleString("ko-KR");

  componentDidMount() {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "";
    });

    const calculateInfo = JSON.parse(localStorage.getItem("calculateInfo"));

    this.setState(calculateInfo);
  }

  componentDidUpdate() {
    localStorage.setItem("calculateInfo", JSON.stringify(this.state));
  }

  render() {
    const resultNumber = this.state.secondNumber || this.state.firstNumber;
    const headingFontSize =
      String(resultNumber).length > SCREEN.FONT_SIZE_SCALE_STANDARD
        ? "3rem"
        : "4rem";

    return (
      <div className="calculator">
        <h1 className="total" style={{ fontSize: headingFontSize }}>
          {this.convertToLocaleString(resultNumber)}
        </h1>
        <DigitComponent
          calculateInfo={this.state}
          setCalculateInfo={this.setState.bind(this)}
        />
        <AllClearComponent
          calculateInfo={this.state}
          setCalculateInfo={this.setState.bind(this)}
        />
        <OperationComponent
          calculateInfo={this.state}
          setCalculateInfo={this.setState.bind(this)}
        />
      </div>
    );
  }
}
