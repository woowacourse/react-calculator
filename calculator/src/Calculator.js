import React from 'react';
import { ERROR_MESSAGE, RULE } from './constants';

class Calculator extends React.Component {
  constructor() {
    super();

    this.state = {
      num1: '',
      num2: '',
      operation: '',
      total: localStorage.getItem('total') ?? 0,
    };

    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('unload', this.handleUnload);
  }

  handleBeforeUnload = e => {
    e.preventDefault();
    e.returnValue = '';
  };

  handleUnload = () => {
    if (!Number.isInteger(this.state.total)) return;

    localStorage.setItem('total', this.state.total);
  };

  render() {
    return (
      <div className="calculator">
        <h1 id="total">{this.state.total}</h1>
        <div className="digits flex" onClick={this.handleDigitButtonClick}>
          {this.digitsTemplate}
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={this.handleModifierButtonClick}>
            AC
          </button>
        </div>
        <div
          className="operations subgrid"
          onClick={this.handleOperationButtonClick}
        >
          {this.operationTemplate}
        </div>
      </div>
    );
  }

  digitsTemplate = Array.from(Array(10).keys())
    .reverse()
    .map((digit, idx) => (
      <button className="digit" key={idx}>
        {digit}
      </button>
    ));

  operationTemplate = ['/', 'X', '-', '+', '='].map((operation, idx) => (
    <button className="operation" key={idx}>
      {operation}
    </button>
  ));

  handleDigitButtonClick = ({ target }) => {
    const digit = target.textContent;
    const { num1, num2, operation, total } = this.state;

    if (!operation) {
      if (num1.length >= RULE.MAX_DIGIT_LENGTH)
        return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

      this.setState({
        ...this.state,
        num1: num1 + digit,
        total: !Number(total) ? digit : total + digit,
      });

      return;
    }

    if (num2.length >= RULE.MAX_DIGIT_LENGTH)
      return alert(ERROR_MESSAGE.IS_OVER_MAX_DIGIT_LENGTH);

    this.setState({ ...this.state, num2: num2 + digit, total: total + digit });
  };

  handleModifierButtonClick = () => {
    this.setState({
      num1: '',
      num2: '',
      operation: '',
      total: 0,
    });
  };

  handleOperationButtonClick = ({ target }) => {
    const operationInput = target.textContent;
    const { num1, num2, operation, total } = this.state;

    if (!num1 || (operationInput === '=' && !num2)) return;

    if (operation && operationInput !== '=')
      return alert(ERROR_MESSAGE.IS_OVER_MAX_OPERATION_COUNT);

    if (operationInput === '=') {
      const newTotal = this.calculate();

      this.setState({
        num1: newTotal,
        num2: '',
        operation: '',
        total: newTotal,
      });

      return;
    }

    this.setState({
      ...this.state,
      operation: operationInput,
      total: total + operationInput,
    });
  };

  calculate() {
    const { num1, num2, operation } = this.state;

    switch (operation) {
      case '+':
        return Number(num1) + Number(num2);
      case '-':
        return Number(num1) - Number(num2);
      case 'X':
        return Number(num1) * Number(num2);
      case '/':
        const result = parseInt(Number(num1) / Number(num2), 10);
        return Number.isNaN(result) ? ERROR_MESSAGE.INFINITY_TOTAL : result;
      // no default
    }
  }
}

export default Calculator;
