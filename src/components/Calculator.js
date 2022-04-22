import { Component } from 'react';
import '../styles/Calculator.css';

const computeExpression = ({ firstOperand, secondOperand, operation }) => {
  if (operation === '/') {
    return Math.floor(firstOperand / secondOperand);
  }
  if (operation === 'X') {
    return firstOperand * secondOperand;
  }
  if (operation === '-') {
    return firstOperand - secondOperand;
  }
  if (operation === '+') {
    return firstOperand + secondOperand;
  }
};

const hasInput = ({ firstOperand, secondOperand, operation }) => {
  return firstOperand !== '0' || secondOperand !== '' || operation !== null;
};

const computeNextOperand = (currentOperand, digit) => {
  return currentOperand.length >= 3
    ? `${currentOperand.slice(0, -1)}${digit}`
    : `${Number(currentOperand + digit)}`;
};

class Calculator extends Component {
  constructor() {
    super();
    const memoizedState = JSON.parse(localStorage.getItem('prevState'));
    this.state = memoizedState
      ? memoizedState
      : {
          firstOperand: '0',
          secondOperand: '',
          operation: null,
          isError: false,
        };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    localStorage.setItem('prevState', JSON.stringify(this.state));
  }

  initState = () => {
    this.setState({
      firstOperand: '0',
      secondOperand: '',
      operation: null,
      isError: false,
    });
  };

  onClickDigit = ({ target }) => {
    const { textContent: digit } = target;
    this.state.operation
      ? this.setState(({ secondOperand }) => ({
          secondOperand: computeNextOperand(secondOperand, digit),
          isError: false,
        }))
      : this.setState(({ firstOperand }) => ({
          firstOperand: computeNextOperand(firstOperand, digit),
          isError: false,
        }));
  };

  onClickOperation = ({ target }) => {
    const { textContent: operation } = target;
    if (operation !== '=') {
      this.setState({ operation });
      return;
    }

    const result = computeExpression({
      firstOperand: Number(this.state.firstOperand),
      secondOperand: Number(this.state.secondOperand),
      operation: this.state.operation,
    });

    if (isFinite(result)) {
      this.setState({
        firstOperand: `${result}`,
        secondOperand: '',
        operation: null,
      });
      return;
    }

    this.setState(() => ({
      isError: true,
    }));
  };

  onBeforeUnload = (e) => {
    e.preventDefault();
    localStorage.setItem('prevState', JSON.stringify(this.state));
    if (hasInput(this.state)) {
      e.returnValue = '';
    }
  };

  render() {
    return (
      <>
        <div>숫자는 3자리 까지만 입력이 가능합니다.</div>
        <div className="calculator">
          <h1 id="total">
            {this.state.isError
              ? '오류'
              : `${this.state.firstOperand}
            ${this.state.operation ?? ''}
            ${this.state.secondOperand}`}
          </h1>
          <div className="digits flex">
            <button className="digit" onClick={this.onClickDigit}>
              9
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              8
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              7
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              6
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              5
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              4
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              3
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              2
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              1
            </button>
            <button className="digit" onClick={this.onClickDigit}>
              0
            </button>
          </div>
          <div className="modifiers subgrid" onClick={this.initState}>
            <button className="modifier">AC</button>
          </div>
          <div className="operations subgrid">
            <button className="operation" onClick={this.onClickOperation}>
              /
            </button>
            <button className="operation" onClick={this.onClickOperation}>
              X
            </button>
            <button className="operation" onClick={this.onClickOperation}>
              -
            </button>
            <button className="operation" onClick={this.onClickOperation}>
              +
            </button>
            <button className="operation" onClick={this.onClickOperation}>
              =
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default Calculator;
