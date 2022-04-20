import React, { Component } from 'react';
import ClearButton from './components/ClearButton';
import Digits from './components/Digits';
import Operators from './components/Operators';
import Screen from './components/Screen';
import { isOverMaxLength } from './validator/index';

export default class Calculator extends Component {
  constructor() {
    super();
    const screenNumber = Number(localStorage.getItem('calculator-data'));
    this.state = { screenNumber, 숫자입력중: true, firstNumber: 0 };
  }

  componentDidUpdate() {
    if (this.state.screenNumber === 0) {
      localStorage.setItem('calculator-data', JSON.stringify(0));
      this.removeBeforeUnloadEvent();
      return;
    }
    this.addBeforeUnloadEvent();
  }

  setFirstNumber = () => {
    this.setState({ firstNumber: this.state.screenNumber });
  };

  resetFirstNumber = () => {
    this.setState({ firstNumber: 0 });
  };

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

  handleBeforeUnload = (e) => {
    e.preventDefault();
    localStorage.setItem(
      'calculator-data',
      JSON.stringify(this.state.screenNumber)
    );
    e.returnValue = '';
  };

  addBeforeUnloadEvent = (e) => {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  };

  removeBeforeUnloadEvent = (e) => {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
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
          firstNumber={this.state.firstNumber}
          setFirstNumber={this.setFirstNumber}
          resetFirstNumber={this.resetFirstNumber}
        ></Operators>
        <ClearButton
          changeScreenNumber={this.changeScreenNumber}
          resetFirstNumber={this.resetFirstNumber}
        ></ClearButton>
      </div>
    );
  }
}
