import React, { Component } from "react";
import DisplayResult from "./component/DisplayResult";
import CalculatorButton from "./component/CalculatorButton";

export default class App extends Component {
  render() {
    return (
      <>
        <div id="app">
          <div className="calculator">
            <DisplayResult />
            <CalculatorButton />
          </div>
        </div>
      </>
    );
  }
}
