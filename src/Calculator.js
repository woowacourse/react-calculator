import React, { Component } from 'react';
import OperationButton from './OperationButton';
import './Calculator.css';

class Calculator extends Component {
  MAX_LENGTH = 3;
  DIGIT_LIST = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  OPERATION_LIST = ['/', 'X', '-', '+'];

  constructor(props) {
    super(props);

    this.state = this.defaultState;
  }

  get defaultState() {
    return {
      numbers: [0, 0],
      operator: '',
    };
  }

  componentDidMount() {
    const savedState = localStorage.getItem('CALCULATOR_STATE');

    if (savedState) {
      this.setState(JSON.parse(savedState));
    }

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';

    localStorage.setItem('CALCULATOR_STATE', JSON.stringify(this.state));
  };

  handleAllClearClick = () => {
    this.setState(this.defaultState);
  };

  handleDigitClick = (digit) => {
    const numberIndex = this.state.operator === '' ? 0 : 1;
    const newStateNumbers = [...this.state.numbers];
    const sign = newStateNumbers[numberIndex] >= 0 ? 1 : -1;

    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(digit) * sign;

    if (newStateNumbers[numberIndex] === Infinity) {
      alert('무한한 숫자는 입력할 수 없어, 입력값을 초기화합니다.');
      this.resetState();
      return;
    }

    if (this.isExceedMaxLength(newStateNumbers[numberIndex])) {
      alert('숫자는 세 자리까지 입력 가능합니다.');
      return;
    }

    this.setState({ numbers: newStateNumbers });
  };

  handleResultClick = () => {
    const { operator, numbers } = this.state;

    if (operator === '') {
      alert('연산자를 입력해주세요.');
      return;
    }

    const operatorCollection = {
      '+': () => numbers[0] + numbers[1],
      '-': () => numbers[0] - numbers[1],
      X: () => numbers[0] * numbers[1],
      '/': () => Number.parseInt(numbers[0] / numbers[1], 10),
    };

    const resultNumber = operatorCollection[operator]();

    this.setState({ numbers: [resultNumber, 0], operator: '' });
  };

  isExceedMaxLength(number) {
    return String(Math.abs(number)).length > this.MAX_LENGTH && number !== Infinity;
  }

  setOperator = (operator) => {
    this.setState({ operator });
  };

  render() {
    const { operator, numbers } = this.state;
    const totalNumber = !operator || numbers[1] === 0 ? numbers[0] : numbers[1];

    const operationButtonProps = {
      currentOperator: operator,
      setOperator: this.setOperator,
    };

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{Number.isNaN(totalNumber) ? '오류' : totalNumber}</h1>
          <div className="digits flex">
            {this.DIGIT_LIST.map((digit) => (
              <button
                key={digit}
                className="digit"
                onClick={() => {
                  this.handleDigitClick(digit);
                }}
              >
                {digit}
              </button>
            ))}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.handleAllClearClick}>
              AC
            </button>
          </div>
          <div className="operations subgrid">
            {this.OPERATION_LIST.map((operation) => (
              <OperationButton key={operation} {...operationButtonProps}>
                {operation}
              </OperationButton>
            ))}
            <button className="operation" onClick={this.handleResultClick}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
