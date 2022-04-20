import React, { Component } from 'react';
import './App.css';
import Button from './Button';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">0</h1>
          <div className="digits flex">
            <Button className="digit keypad" text="9" />
            <Button className="digit keypad" text="8" />
            <Button className="digit keypad" text="7" />
            <Button className="digit keypad" text="6" />
            <Button className="digit keypad" text="5" />
            <Button className="digit keypad" text="4" />
            <Button className="digit keypad" text="3" />
            <Button className="digit keypad" text="2" />
            <Button className="digit keypad" text="1" />
            <Button className="digit keypad" text="0" />
          </div>
          <div className="modifiers subgrid">
            <Button className="modifier keypad" text="AC" />
          </div>
          <div className="operations subgrid">
            <Button className="operation keypad" text="/" />
            <Button className="operation keypad" text="X" />
            <Button className="operation keypad" text="-" />
            <Button className="operation keypad" text="+" />
            <Button className="operation keypad" text="=" />
          </div>
        </div>
      </div>
    );
  }
}
