import { Component } from 'react';
import '../styles/Calculator.css';

const computeExpression = ({ firstOperand, secondOperand, operation }) => {
  if (operation === '/') {
    if (secondOperand === 0) {
      throw new Error('');
    }
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

  onClickDigits = ({ target }) => {
    const { textContent: digit } = target;

    if (this.state.operation) {
      this.setState(({ secondOperand }) => {
        return {
          secondOperand: `${Number(secondOperand + digit)}`,
          isError: false,
        };
      });
      return;
    }
    this.setState(({ firstOperand }) => {
      return {
        firstOperand: `${Number(firstOperand + digit)}`,
        isError: false,
      };
    });
  };

  onClickModifier = () => {
    // 함수로 분리하면 어떨까?
    this.setState({
      firstOperand: '0',
      secondOperand: '',
      operation: null,
      isError: false,
    });
  };

  onClickOperations = ({ target }) => {
    const { textContent: operation } = target;

    if (operation === '=') {
      try {
        const result = computeExpression({
          firstOperand: Number(this.state.firstOperand),
          secondOperand: Number(this.state.secondOperand),
          operation: this.state.operation,
        });

        // isError는 어디갔니?
        this.setState({
          firstOperand: result,
          secondOperand: '',
          operation: null,
        });
      } catch (error) {
        this.setState({
          firstOperand: '0',
          secondOperand: '',
          operation: null,
          isError: true,
        });
      }
      return;
    }
    this.setState((prevState) => ({ ...prevState, operation }));
  };

  onBeforeUnload = (e) => {
    e.preventDefault();
    const { firstOperand, secondOperand, operation } = this.state;
    if (firstOperand !== '0' || secondOperand !== '' || operation !== null) {
      localStorage.setItem('prevState', JSON.stringify(this.state));
      e.returnValue = '';
    }
  };

  // template을 만드는 함수를 만들어서 명시적으로 좀 해볼까?

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
        <div className="modifiers subgrid" onClick={this.onClickModifier}>
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
