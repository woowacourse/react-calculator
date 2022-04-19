import React, { Component } from 'react';
import ClearButton from './components/ClearButton';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { isOverMaxLength } from './validator/index';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      screenNumber: 0,
      firstNumber: 0,
      operator: '',
    };
  }

  changeScreenNumber = (targetNumber) => {
    this.setState({ screenNumber: targetNumber });
  };

  onClickDigit = (enteredDigit) => {
    if (this.state.firstNumber === this.state.screenNumber) {
      this.changeScreenNumber(enteredDigit);
      return;
    }
    const prevNumber = this.state.screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      this.changeScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  onClickOperator = (operator) => {
    if (operator === '=') {
      this.setState({
        firstNumber: 0,
        operator: '',
      });
      switch (this.state.operator) {
        case '+':
          this.changeScreenNumber(
            this.state.firstNumber + this.state.screenNumber
          );
          break;
        case '-':
          this.changeScreenNumber(
            this.state.firstNumber - this.state.screenNumber
          );
          break;
        case 'X':
          this.changeScreenNumber(
            this.state.firstNumber * this.state.screenNumber
          );
          break;
        case '/':
          this.changeScreenNumber(
            this.state.firstNumber / this.state.screenNumber
          );
          break;
        default:
          break;
      }
      return;
    }
    if (!this.state.operator) {
      this.setState({ firstNumber: this.state.screenNumber });
      this.setState({ operator });
    }
  };

  render() {
    return (
      <div className="calculator">
        <Screen screenNumber={this.state.screenNumber}></Screen>
        <Digits onClickDigit={this.onClickDigit}></Digits>
        <Operators onClickOperator={this.onClickOperator}></Operators>
        <ClearButton changeScreenNumber={this.changeScreenNumber}></ClearButton>
      </div>
    );
  }
}
