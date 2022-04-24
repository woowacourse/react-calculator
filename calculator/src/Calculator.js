import { Component } from 'react';
import './css/index.css';
import {
  FONT_SIZE_STANDARD,
  INFINITY_MESSAGE,
  MAX_CURRENT_LENGTH,
} from './constants';

class Calculator extends Component {
  constructor() {
    super();

    this.state = JSON.parse(localStorage.getItem('state')) ?? {
      total: 0,
      current: 0,
      operator: '',
      isLastClickOperator: false,
    };

    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener('beforeunload', this.componentCleanup);
  }

  componentCleanup() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleDigitClick(digitValue) {
    const { current, isLastClickOperator } = this.state;

    if (current.toString().length > MAX_CURRENT_LENGTH) {
      this.setState({ current: Infinity });
      return;
    }

    if (isLastClickOperator) {
      this.enterNewOperand(digitValue);
    }

    if (!isLastClickOperator) {
      this.concatDigitOperand(digitValue);
    }
  }

  enterNewOperand(digitValue) {
    this.setState({
      current: digitValue,
      isLastClickOperator: false,
    });
  }

  concatDigitOperand(digitValue) {
    const { current } = this.state;

    this.setState({
      current: current * 10 + digitValue,
    });
  }

  handleOperatorClick(operatorValue) {
    const { isLastClickOperator, operator, total, current } = this.state;

    this.updateOperator(operatorValue);

    if (isLastClickOperator) return;

    if (!this.isOperatorExist()) {
      this.calculate(current);
    }

    if (this.isOperatorExist()) {
      const result = this.operate(total, current, operator);

      this.calculate(result);
    }
  }

  updateOperator(operatorValue) {
    this.setState({
      operator: operatorValue === '=' ? '' : operatorValue,
      isLastClickOperator: true,
    });
  }

  calculate(result) {
    this.setState({
      total: result,
      current: result,
    });
  }

  isOperatorExist() {
    return this.state.operator !== '';
  }

  operate(a, b, operator) {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case 'X':
        return a * b;
      case '/':
        return a / b;
      default:
        break;
    }
  }

  handleClear() {
    this.setState({
      total: 0,
      current: 0,
      operator: '',
      isLastClickOperator: false,
    });
  }

  render() {
    const { current } = this.state;
    const digits = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    const operators = ['/', 'X', '-', '+', '='];

    return (
      <div className="App">
        <div className="calculator">
          <div className="total">
            <h1
              className={
                current.toString().length >= FONT_SIZE_STANDARD
                  ? ' small-total-font'
                  : ''
              }
            >
              {current === Infinity ? INFINITY_MESSAGE : current}
            </h1>
          </div>
          <div className="digits flex">
            {digits.map(digit => (
              <button
                key={digit.toString()}
                className="digit"
                onClick={e =>
                  this.handleDigitClick(Number(e.target.textContent))
                }
              >
                {digit}
              </button>
            ))}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={() => this.handleClear()}>
              AC
            </button>
          </div>
          <div className="operations subgrid">
            {operators.map(operator => (
              <button
                className="operation"
                key={operator}
                onClick={e => this.handleOperatorClick(e.target.textContent)}
              >
                {operator}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
