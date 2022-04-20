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
      let newTotal;

      switch (operation) {
        case '+': {
          newTotal = Number(num1) + Number(num2);
          this.setState({ ...this.state, total: newTotal });
          break;
        }
        case '-': {
          newTotal = Number(num1) - Number(num2);
          this.setState({ ...this.state, total: newTotal });
          break;
        }
        case 'X': {
          newTotal = Number(num1) * Number(num2);
          this.setState({ ...this.state, total: newTotal });
          break;
        }
        case '/': {
          const result = parseInt(Number(num1) / Number(num2), 10);
          newTotal = Number.isNaN(result)
            ? ERROR_MESSAGE.INFINITY_TOTAL
            : result;
          this.setState({ ...this.state, total: newTotal });
        }
        // no default
      }

      this.setState({ num1: newTotal, num2: '', operation: '' });

      return;
    }

    this.setState({
      ...this.state,
      operation: operationInput,
      total: total + operationInput,
    });
  };

  render() {
    return (
      <div className="calculator">
        <h1 id="total">{this.state.total}</h1>
        <div className="digits flex" onClick={this.handleDigitButtonClick}>
          <button className="digit">9</button>
          <button className="digit">8</button>
          <button className="digit">7</button>
          <button className="digit">6</button>
          <button className="digit">5</button>
          <button className="digit">4</button>
          <button className="digit">3</button>
          <button className="digit">2</button>
          <button className="digit">1</button>
          <button className="digit">0</button>
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
          <button className="operation">/</button>
          <button className="operation">X</button>
          <button className="operation">-</button>
          <button className="operation">+</button>
          <button className="operation">=</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
