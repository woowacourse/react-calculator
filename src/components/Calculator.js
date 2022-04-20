import { Component } from 'react';
import '../styles/Calculator.css';

const computeExpression = ({ firstOperand, secondOperand, operation }) => {
  if (operation === '/') {
    return firstOperand / secondOperand;
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

/** 생명 주기 -> 각자 어떤 부분을 학습해볼까? 애기해보기 */
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
    this.setState((prevState) => ({
      ...prevState,
      firstOperand: '0',
      secondOperand: '',
      operation: null,
      isError: false,
    }));
  };

  onClickDigits = ({ target }) => {
    const { textContent: digit } = target;

    if (this.state.operation) {
      this.setState(({ secondOperand }) => ({
        secondOperand: `${Number(secondOperand + digit)}`,
        isError: false,
      }));
      return;
    }
    this.setState(({ firstOperand }) => ({
      firstOperand: `${Number(firstOperand + digit)}`,
      isError: false,
    }));
  };

  onClickOperations = ({ target }) => {
    const { textContent: operation } = target;
    if (operation !== '=') {
      this.setState((prevState) => ({ ...prevState, operation }));
      return;
    }

    const result = computeExpression({
      firstOperand: Number(this.state.firstOperand),
      secondOperand: Number(this.state.secondOperand),
      operation: this.state.operation,
    });

    if (isFinite(result)) {
      this.setState((prevState) => ({
        ...prevState,
        firstOperand: result,
        secondOperand: '',
        operation: null,
      }));
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      isError: true,
    }));
  };

  onBeforeUnload = (e) => {
    e.preventDefault();
    localStorage.setItem('prevState', JSON.stringify(this.state));
    if (hasInput({ ...this.state })) {
      e.returnValue = '';
    }
  };

  render() {
    return (
      <div className="calculator">
        <h1 id="total">
          {this.state.isError
            ? '오류'
            : `${this.state.firstOperand}
            ${this.state.operation ?? ''}
            ${this.state.secondOperand}`}
        </h1>
        <div className="digits flex" onClick={this.onClickDigits}>
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
        <div className="modifiers subgrid" onClick={this.initState}>
          <button className="modifier">AC</button>
        </div>
        <div className="operations subgrid" onClick={this.onClickOperations}>
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
