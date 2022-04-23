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
          firstNumber: '',
          secondNumber: '',
          operand: '',
        };

    this.state = result;
  }

  handleNumber(e) {
    if (this.state.firstNumber === ERROR_MESSAGE) this.clearResult();
    if (this.state.operand === '') {
      this.setFirstNumber(e.target.dataset.number);
      return;
    }
    this.setSecondNumber(e.target.dataset.number);
  }

  handleOperation(e) {
    if (this.state.firstNumber === ERROR_MESSAGE) this.clearResult();

    if (e.target.dataset.operator === '=') {
      this.calculate();
      return;
    }

    if (this.state.operand !== '') return;
    this.setState({
      operand: e.target.dataset.operator,
    });
  }

  setFirstNumber(value) {
    if (this.isOverThreeDigit(this.state.firstNumber)) {
      return;
    }
    this.setState((prevState) => ({
      firstNumber: prevState.firstNumber + value,
    }));
  }

  setSecondNumber(value) {
    if (this.isOverThreeDigit(this.state.secondNumber)) {
      return;
    }
    this.setState((prevState) => ({
      secondNumber: prevState.secondNumber + value,
    }));
  }

  isOverThreeDigit(number) {
    return number.length >= 3;
  }

  calculate() {
    if (!operation[this.state.operand]) return;

    const result = operation[this.state.operand](
      +this.state.firstNumber,
      +this.state.secondNumber,
    );

    this.setState({
      firstNumber: Number.isFinite(result) ? String(result) : ERROR_MESSAGE,
      secondNumber: '',
      operand: '',
    });
  }


  clearResult() {
    this.setState({
      firstNumber: '',
      secondNumber: '',
      operand: '',
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
            {this.state.firstNumber + this.state.operand + this.state.secondNumber}
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
