import React, { Component, createRef } from "react";

import "./App.css";

import DigitComponent from "./Components/DigitComponent";
import OperationComponent from "./Components/OperationComponent";
import AllClearComponent from "./Components/AllClearComponent";

import { SCREEN } from "./constant";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      firstNumber: 0,
      operation: "",
      secondNumber: "",
    };

    this.calculateScreenElement = createRef();
  }

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
    const calculateScreenElement = this.calculateScreenElement.current;

    calculateScreenElement.textContent = this.convertToLocaleString(
      this.state.secondNumber === ""
        ? this.state.firstNumber
        : this.state.secondNumber
    );

    calculateScreenElement.textContent.length > SCREEN.FONT_SIZE_SCALE_STANDARD
      ? (calculateScreenElement.style.fontSize = "3rem")
      : (calculateScreenElement.style.fontSize = "4rem");

    localStorage.setItem("calculateInfo", JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="calculator">
        <h1 className="total" ref={this.calculateScreenElement}>
          0
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
