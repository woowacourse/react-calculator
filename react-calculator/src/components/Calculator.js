import React, { Component } from 'react';
import ClearButton from './ClearButton';
import Digits from '../components/Digits';
import Operators from '../components/Operators';
import Screen from '../elements/Screen';

export default class Calculator extends Component {
  constructor() {
    super();
    this.state = { screenNumber: 0 };
  }

  changeState = (value) => {
    this.setState({ screenNumber: value });
    console.log(this.state);
  };

  render() {
    return (
      <div className="calculator">
        <Screen screenNumber={this.state.screenNumber}></Screen>
        <Digits changeScreenNumber={this.changeState}></Digits>
        <Operators></Operators>
        <ClearButton></ClearButton>
      </div>
    );
  }
}
