import React, { Component } from 'react';
import './App.css';
import Button from './Button';

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const OPERATORS = ['/', 'X', '-', '+'];
const EQUAL = '=';

const calculate = (expression) => {
  const operator = Array.from(expression).find((char) =>
    OPERATORS.includes(char)
  );
  const [firstNumber, secondNumber] = expression
    .split(operator)
    .map((numberString) => Number(numberString));

  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case 'X':
      return firstNumber * secondNumber;
    case '/':
      return secondNumber === 0
        ? Infinity
        : parseInt(firstNumber / secondNumber, 10);
    default:
      throw new Error('error');
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '',
      result: '0',
    };

    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
  }

  handleDigitClick(digit) {
    this.setState((prevState) => ({
      expression: `${prevState.expression}${digit}`,
      result: `${prevState.expression}${digit}`,
    }));
  }

  handleOperationClick(operation) {
    this.setState((prevState) => ({
      expression: `${prevState.expression}${operation}`,
      result: `${prevState.expression}${operation}`,
    }));
  }

  handleEqualClick() {
    const { expression } = this.state;
    const result = calculate(expression);

    this.setState({
      expression: '',
      result: result === Infinity ? '오류' : result.toString(),
    });
  }

  handleACClick() {
    this.setState({
      expression: '',
      result: '0',
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{this.state.result}</h1>
          <div className="digits flex">
            {DIGITS.map((digit) => (
              <Button
                key={digit}
                className="digit keypad"
                onClick={this.handleDigitClick}
                text={digit.toString()}
              />
            ))}
          </div>
          <div className="modifiers subgrid">
            <Button
              onClick={this.handleACClick}
              className="modifier keypad"
              text="AC"
            />
          </div>
          <div className="operations subgrid">
            {OPERATORS.map((operator) => (
              <Button
                key={operator}
                onClick={this.handleOperationClick}
                className="operation keypad"
                text={operator}
              />
            ))}
            <Button
              onClick={this.handleEqualClick}
              className="operation keypad"
              text={EQUAL}
            />
          </div>
        </div>
      </div>
    );
  }
}
