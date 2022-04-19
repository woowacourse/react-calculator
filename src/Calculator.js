import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumber: '',
      secondNumber: '',
      operand: '',
    };
  }

  operation = {
    '+': this.add,
    '-': this.subtract,
    'x': this.multiply,
    '/': this.divide,
  };

  isOverThreeDigit(number) {
    return number.length >= 3;
  }

  setFirstNumber(number) {
    if (this.isOverThreeDigit(this.state.firstNumber)) {
      return;
    }
    this.setState((prevState) => ({
      firstNumber: prevState.firstNumber + number,
    }));
  }

  setSecondNumber(number) {
    if (this.isOverThreeDigit(this.state.secondNumber)) {
      return;
    }
    this.setState((prevState) => ({
      secondNumber: prevState.secondNumber + number,
    }));
  }

  handleNumber(e) {
    if (this.state.operand === '') {
      this.setFirstNumber(e.target.dataset.number);
      return;
    }
    this.setSecondNumber(e.target.dataset.number);
  }

  handleModifier(e) {
    console.log('AC');
  }

  add(firstNumber, secondNumber) {
    return String(firstNumber + secondNumber);
  }

  subtract(firstNumber, secondNumber) {
    return String(firstNumber - secondNumber);
  }

  multiply(firstNumber, secondNumber) {
    return String(firstNumber * secondNumber);
  }

  divide(firstNumber, secondNumber) {
    return String(firstNumber / secondNumber);
  }

  calculate() {
    if (!this.operation[this.state.operand]) return;

    this.setState({
      firstNumber: this.operation[this.state.operand](
        +this.state.firstNumber,
        +this.state.secondNumber,
      ),
      secondNumber: '',
      operand: '',
    });
  }

  handleOperation(e) {
    if (e.target.dataset.operator === '=') {
      this.calculate();
      return;
    }

    if (this.state.operand !== '') return;
    this.setState({
      operand: e.target.dataset.operator,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">
            {this.state.firstNumber + this.state.operand + this.state.secondNumber}
          </h1>
          <div className="digits flex" onClick={this.handleNumber.bind(this)}>
            <button className="digit" data-number="9">
              9
            </button>
            <button className="digit" data-number="8">
              8
            </button>
            <button className="digit" data-number="7">
              7
            </button>
            <button className="digit" data-number="6">
              6
            </button>
            <button className="digit" data-number="5">
              5
            </button>
            <button className="digit" data-number="4">
              4
            </button>
            <button className="digit" data-number="3">
              3
            </button>
            <button className="digit" data-number="2">
              2
            </button>
            <button className="digit" data-number="1">
              1
            </button>
            <button className="digit" data-number="0">
              0
            </button>
          </div>
          <div className="modifiers subgrid" onClick={this.handleModifier.bind(this)}>
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
