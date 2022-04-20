import React, { Component } from 'react';
import OperationButton from './OperationButton';
import './Calculator.css';

class Calculator extends Component {
  constructor(props) {
    super(props);

    const savedState = localStorage.getItem('CALCULATOR_STATE');

    if (savedState) {
      this.state = JSON.parse(savedState);
      return;
    }

    this.state = {
      numbers: [0, 0],
      operator: '',
    };
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  onBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = '';

    localStorage.setItem('CALCULATOR_STATE', JSON.stringify(this.state));
  };

  onClickDigit = ({ target }) => {
    const numberIndex = this.state.operator === '' ? 0 : 1;
    const newStateNumbers = [...this.state.numbers];
    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(target.innerText);

    if (newStateNumbers[numberIndex] === Infinity) {
      alert('무한한 숫자는 입력할 수 없어, 입력값을 초기화합니다.');
      this.setState({
        numbers: [0, 0],
        operator: '',
      });
      return;
    }

    if (newStateNumbers[numberIndex] >= 1000 && newStateNumbers[numberIndex] !== Infinity) {
      alert('숫자는 세 자리까지 입력 가능합니다.');
      return;
    }

    this.setState({ numbers: newStateNumbers });
  };

  onClickResult = () => {
    const { operator, numbers } = this.state;

    if (operator === '') {
      alert('연산자를 입력해주세요.');
      return;
    }

    const operatorCollection = {
      '+': () => numbers[0] + numbers[1],
      '-': () => numbers[0] - numbers[1],
      X: () => numbers[0] * numbers[1],
      '/': () => numbers[0] / numbers[1],
    };

    const resultNumber = Number(operatorCollection[operator]().toFixed(2));
    this.setState({ numbers: [resultNumber, 0], operator: '' });
  };

  onClickAllClear = () => {
    this.setState({
      numbers: [0, 0],
      operator: '',
    });
  };

  setOperator = (operator) => {
    this.setState({ operator });
  };

  render() {
    const { operator, numbers } = this.state;
    let totalNumber = !operator || numbers[1] === 0 ? numbers[0] : numbers[1];
    if (totalNumber === Infinity) totalNumber = '오류';

    const digitList = Array.from({ length: 10 }, (_, index) => 9 - index);

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{totalNumber}</h1>
          <div className="digits flex">
            {digitList.map((digit) => (
              <button key={digit} className="digit" onClick={this.onClickDigit}>
                {digit}
              </button>
            ))}
          </div>
          <div className="modifiers subgrid">
            <button className="modifier" onClick={this.onClickAllClear}>
              AC
            </button>
          </div>
          <div className="operations subgrid">
            <OperationButton currentOperator={operator} setOperator={this.setOperator}>
              /
            </OperationButton>
            <OperationButton currentOperator={operator} setOperator={this.setOperator}>
              X
            </OperationButton>
            <OperationButton currentOperator={operator} setOperator={this.setOperator}>
              -
            </OperationButton>
            <OperationButton currentOperator={operator} setOperator={this.setOperator}>
              +
            </OperationButton>
            <button className="operation" onClick={this.onClickResult}>
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
