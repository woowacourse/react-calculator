import { Component } from 'react';
import OperationButton from './OperationButton';
import './Calculator.css';

class Calculator extends Component {
  MAX_NUMBER = 1000;
  DIGIT_LIST = Array.from({ length: 10 }, (_, index) => 9 - index);
  OPERATION_LIST = ['/', 'X', '-', '+'];

  constructor(props) {
    super(props);

    this.state = this.initState();
  }

  get defaultState() {
    return {
      numbers: [0, 0],
      operator: '',
    };
  }

  initState() {
    const savedState = localStorage.getItem('CALCULATOR_STATE');
    if (savedState) {
      return JSON.parse(savedState);
    }

    return this.defaultState;
  }

  #isExceedMaxNumber(number) {
    return number >= this.MAX_NUMBER && number !== Infinity;
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

  onClickAllClear = () => {
    this.setState(this.defaultState);
  };

  onClickDigit = (digit) => {
    const numberIndex = this.state.operator === '' ? 0 : 1;
    const newStateNumbers = [...this.state.numbers];
    newStateNumbers[numberIndex] = newStateNumbers[numberIndex] * 10 + Number(digit);

    if (newStateNumbers[numberIndex] === Infinity) {
      alert('무한한 숫자는 입력할 수 없어, 입력값을 초기화합니다.');
      this.resetState();
      return;
    }

    if (this.#isExceedMaxNumber(newStateNumbers[numberIndex])) {
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

  setOperator = (operator) => {
    this.setState({ operator });
  };

  render() {
    const { operator, numbers } = this.state;
    let totalNumber = !operator || numbers[1] === 0 ? numbers[0] : numbers[1];
    if (totalNumber === Infinity) totalNumber = '오류';

    const operationButtonProps = {
      currentOperator: operator,
      setOperator: this.setOperator,
    };

    return (
      <div className="App">
        <div className="calculator">
          <h1 id="total">{totalNumber}</h1>
          <div className="digits flex">
            {this.DIGIT_LIST.map((digit) => (
              <button key={digit} className="digit" onClick={() => this.onClickDigit(digit)}>
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
            {this.OPERATION_LIST.map((operation) => (
              <OperationButton key={operation} {...operationButtonProps}>
                {operation}
              </OperationButton>
            ))}
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
