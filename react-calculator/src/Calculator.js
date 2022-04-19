import React, { Component } from 'react';
import ClearButton from './components/ClearButton';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { isOverMaxLength } from './validator/index';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = { screenNumber: 0, 숫자입력중: true };
  }

  changeScreenNumber = (targetNumber) => {
    this.setState({ screenNumber: targetNumber });
  };

  changeStep = (target) => {
    this.setState({ 숫자입력중: target });
  };

  onClickDigit = (enteredDigit) => {
    if (!this.state.숫자입력중) {
      this.changeScreenNumber(enteredDigit);
      this.setState({ 숫자입력중: true });
      return;
    }
    const prevNumber = this.state.screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      this.changeScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  render() {
    return (
      <div className="calculator">
        <Screen screenNumber={this.state.screenNumber}></Screen>
        <Digits onClickDigit={this.onClickDigit}></Digits>
        <Operators
          changeScreenNumber={this.changeScreenNumber}
          screenNumber={this.state.screenNumber}
          changeStep={this.changeStep}
          숫자입력중={this.state.숫자입력중}
        ></Operators>
        <ClearButton changeScreenNumber={this.changeScreenNumber}></ClearButton>
      </div>
    );
  }
}
