import React, { Component } from 'react';
import './App.css';
import Button from './Button';

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const OPERATORS = ['/', 'X', '-', '+'];
const EQUAL = '=';

const tryCatcher = (func) => {
  return (...args) => {
    try {
      func(...args);
    } catch (error) {
      alert(error);
    }
  };
};

const calculate = (firstNumber, secondNumber, operator) => {
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
      throw new Error('calculate');
  }
};

const appendCharToLastElem = (list, char) => {
  const listClone = [...list];
  const lastIndex = listClone.length - 1;

  listClone[lastIndex] += char;

  return listClone;
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberStrings: [''],
      operator: null,
      displayedText: '0',
    };

    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
    this.confirmLeave = this.confirmLeave.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.confirmLeave);
    window.addEventListener('unload', this.handleUnload);

    const state = JSON.parse(localStorage.getItem('calculator'));

    this.setState(state);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.confirmLeave);
  }

  handleDigitClick(digit) {
    const { numberStrings } = this.state;

    if (numberStrings[numberStrings.length - 1].length >= 3) {
      throw new Error('error');
    }

    const updatedNumberStrings = appendCharToLastElem(
      numberStrings,
      digit.toString()
    );

    this.setState({
      numberStrings: updatedNumberStrings,
      displayedText: updatedNumberStrings[updatedNumberStrings.length - 1],
    });
  }

  handleOperatorClick(operator) {
    const { numberStrings } = this.state;

    if (
      numberStrings.length >= 2 &&
      numberStrings[numberStrings.length - 1] !== ''
    ) {
      throw new Error('error');
    }

    this.setState((prevState) => {
      const prevNumberStrings = prevState.numberStrings;

      if (prevNumberStrings[prevNumberStrings.length - 1] !== '') {
        prevNumberStrings.push('');
      }

      return {
        numberStrings: prevNumberStrings,
        operator,
      };
    });
  }

  handleEqualClick() {
    const {
      numberStrings: [firstNumber, secondNumber],
      operator,
    } = this.state;
    const result = calculate(
      Number(firstNumber),
      Number(secondNumber),
      operator
    );

    this.setState({
      numberStrings: [''],
      operator: null,
      displayedText: result === Infinity ? '오류' : result.toString(),
    });
  }

  handleACClick() {
    this.setState({
      numberStrings: [''],
      operator: null,
      displayedText: '0',
    });
  }

  handleUnload() {
    localStorage.setItem('calculator', JSON.stringify(this.state));
  }

  confirmLeave(e) {
    e.preventDefault();

    e.returnValue = '';

    return '';
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{this.state.displayedText}</h1>
          <div className="digits flex">
            {DIGITS.map((digit) => (
              <Button
                key={digit}
                className="digit keypad"
                onClick={tryCatcher(this.handleDigitClick)}
                text={digit.toString()}
              />
            ))}
          </div>
          <div className="modifiers subgrid">
            <Button
              onClick={tryCatcher(this.handleACClick)}
              className="modifier keypad"
              text="AC"
            />
          </div>
          <div className="operators subgrid">
            {OPERATORS.map((operator) => (
              <Button
                key={operator}
                onClick={tryCatcher(this.handleOperatorClick)}
                className="operator keypad"
                text={operator}
              />
            ))}
            <Button
              onClick={tryCatcher(this.handleEqualClick)}
              className="operator keypad"
              text={EQUAL}
            />
          </div>
        </div>
      </div>
    );
  }
}
