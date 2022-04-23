import React from 'react';
import { ERROR_MESSAGE, STORAGE_KEY } from './constants';

const operation = {
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  'x': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '/': (firstNumber, secondNumber) => Math.floor(firstNumber / secondNumber),
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    const result = localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY))
      : {
          firstOperand: '',
          secondOperand: '',
          operator: '',
        };

    this.state = result;
  }

  handleNumber(e) {
    if (this.state.firstOperand === ERROR_MESSAGE) this.clearResult();
    if (this.state.operator === '') {
      this.setFirstOperand(e.target.dataset.number);
      return;
    }
    this.setSecondOperand(e.target.dataset.number);
  }

  handleOperation(e) {
    if (this.state.firstOperand === ERROR_MESSAGE) this.clearResult();

    if (e.target.dataset.operator === '=') {
      this.calculate();
      return;
    }

    if (this.state.operator !== '') return;
    this.setState({
      operator: e.target.dataset.operator,
    });
  }

  setFirstOperand(value) {
    if (this.isOverThreeDigit(this.state.firstOperand)) {
      return;
    }
    this.setState((prevState) => ({
      firstOperand: prevState.firstOperand + value,
    }));
  }

  setSecondOperand(value) {
    if (this.isOverThreeDigit(this.state.secondOperand)) {
      return;
    }
    this.setState((prevState) => ({
      secondOperand: prevState.secondOperand + value,
    }));
  }

  isOverThreeDigit(number) {
    return number.length >= 3;
  }

  calculate() {
    if (!operation[this.state.operator]) return;

    const result = operation[this.state.operator](
      +this.state.firstOperand,
      +this.state.secondOperand,
    );

    this.setState({
      firstOperand: Number.isFinite(result) ? String(result) : ERROR_MESSAGE,
      secondOperand: '',
      operator: '',
    });
  }

  clearResult() {
    this.setState({
      firstOperand: '',
      secondOperand: '',
      operator: '',
    });
  }

  saveResult(e) {
    e.preventDefault();
    e.returnValue = '';
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...this.state }));
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveResult.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveResult.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">
            {this.state.firstOperand + this.state.operator + this.state.secondOperand}
          </h1>
          <div className="digits flex" onClick={this.handleNumber.bind(this)}>
            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((number) => (
              <button className="digit" data-number={number}>
                {number}
              </button>
            ))}
          </div>
          <div className="modifiers subgrid" onClick={this.clearResult.bind(this)}>
            <button className="modifier" id="clear-button">
              AC
            </button>
          </div>
          <div className="operations subgrid" onClick={this.handleOperation.bind(this)}>
            <button className="operation" data-operator="/">
              /
            </button>
            <button className="operation" data-operator="x">
              X
            </button>
            <button className="operation" data-operator="-">
              -
            </button>
            <button className="operation" data-operator="+">
              +
            </button>
            <button id="calculate-button" data-operator="=">
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
