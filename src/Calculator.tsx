import React from 'react'

enum Operator {
  empty = '',
  plus = 'plus',
  minus = 'minus',
  multiply = 'multiply',
  divide = 'divide',
  
}

type State = {
  prevNumber: null | number,
  nextNumber: null | number,
  operator: Operator,
  result: string,
}

class Calculator extends React.Component<any, State> {
  static localStorageKey = 'calculator-key';

  static initialState = {
    prevNumber: null, nextNumber: null, operator: Operator.empty, result: '0',
  };

  static errorState = (errorMessage: string) => ({
    ...Calculator.initialState, result: errorMessage,
  });

  constructor(props: any) {
    super(props);
    const originalState = JSON.parse(localStorage.getItem(Calculator.localStorageKey) ?? "{}");
    this.state = { ...Calculator.initialState, ...originalState };
    window.addEventListener('beforeunload', this.saveCurrentStateBeforeLeave);
    window.onbeforeunload = function() {
      return 'Are you sure you want to leave?';
    };
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveCurrentStateBeforeLeave);
  }

  saveCurrentStateBeforeLeave = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    localStorage.setItem(Calculator.localStorageKey, JSON.stringify(this.state));
  }

  onClickDigitBtn = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const { prevNumber, nextNumber, operator } = this.state;
    const digit = (target as HTMLElement).dataset.digit;
    if (!digit) return;

    const isPrevNumberTurn = operator === Operator.empty;
    if (isPrevNumberTurn) {
      if (prevNumber === null) {
        const _prevNumber = Number(digit);
        this.setState({ prevNumber: _prevNumber, result: `${_prevNumber}` });
        return;
      }

      if (`${prevNumber}`.length >= 3) return;
      const _prevNumber = Number(prevNumber + digit);
      this.setState({ prevNumber: _prevNumber, result: `${_prevNumber}` });
      return;
    }

    if (nextNumber === null) {
      const _nextNumber = Number(digit);
      this.setState({ nextNumber: _nextNumber, result: `${_nextNumber}` });
      return;
    }

    if (`${nextNumber}`.length >= 3) return;
    const _nextNumber = Number(nextNumber + digit);
    this.setState({ nextNumber: _nextNumber, result: `${_nextNumber}` });
  };

  onClickOperator = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    const { prevNumber } = this.state;
    const operator = (target as HTMLElement).dataset.operator;
    if (!operator) return;
    const isValidOperator = Object.values(Operator).includes(operator as Operator);
    if (!isValidOperator) {
      this.setState({ ...Calculator.errorState('유효한 연산자가 아닙니다') });
      return;
    }
    if (!prevNumber) {
      this.setState({ ...Calculator.errorState('숫자를 먼저 입력해 주세요') });
      return;
    }
    this.setState({ operator: operator as Operator });
  };

  onClickCalculateBtn = () => {
    const { prevNumber, nextNumber, operator } = this.state;

    if (!prevNumber) return;
    if (!operator) return;
    if (nextNumber === null) {
      this.setState({ operator: Operator.empty });
      return;
    }

    let operatorFn = null;
    switch(operator) {
      case Operator.plus: {
        operatorFn = this.plus;
        break;
      }
      case Operator.minus: {
        operatorFn = this.minus;
        break;
      }
      case Operator.multiply: {
        operatorFn = this.multiply;
        break;
      }
      case Operator.divide: {
        operatorFn = this.divide;
        break;
      }
    }

    const result = Math.floor(operatorFn(prevNumber, nextNumber));

    if (Number.isNaN(result)) {
      this.setState({ ...Calculator.errorState('숫자 아님') });
      return;
    }

    if (!Number.isFinite(result)) {
      this.setState({ ...Calculator.errorState('오류') });
      return;
    }

    this.setState({ prevNumber: result, nextNumber: null, operator: Operator.empty, result: `${result}` });
  };

  plus = (num1: number, num2: number) => num1 + num2;

  minus = (num1: number, num2: number) => num1 - num2;

  multiply = (num1: number, num2: number) => num1 * num2;

  divide = (num1: number, num2: number) => num1 / num2;

  render() {
    return (
      <div className="calculator">
        <h1 id="total">{ this.state.result }</h1>
        <div className="digits flex">
          <button className="digit" data-digit="9" onClick={this.onClickDigitBtn}>9</button>
          <button className="digit" data-digit="8" onClick={this.onClickDigitBtn}>8</button>
          <button className="digit" data-digit="7" onClick={this.onClickDigitBtn}>7</button>
          <button className="digit" data-digit="6" onClick={this.onClickDigitBtn}>6</button>
          <button className="digit" data-digit="5" onClick={this.onClickDigitBtn}>5</button>
          <button className="digit" data-digit="4" onClick={this.onClickDigitBtn}>4</button>
          <button className="digit" data-digit="3" onClick={this.onClickDigitBtn}>3</button>
          <button className="digit" data-digit="2" onClick={this.onClickDigitBtn}>2</button>
          <button className="digit" data-digit="1" onClick={this.onClickDigitBtn}>1</button>
          <button className="digit" data-digit="0" onClick={this.onClickDigitBtn}>0</button>
        </div>
        <div className="modifiers subgrid">
          <button className="modifier" onClick={() => this.setState({ ...Calculator.initialState })}>AC</button>
        </div>
        <div className="operations subgrid">
          <button className="operation" data-operator="divide" onClick={this.onClickOperator}>/</button>
          <button className="operation" data-operator="multiply" onClick={this.onClickOperator}>X</button>
          <button className="operation" data-operator="minus" onClick={this.onClickOperator}>-</button>
          <button className="operation" data-operator="plus" onClick={this.onClickOperator}>+</button>
          <button id="calculate-equal" className="operation" onClick={this.onClickCalculateBtn}>=</button>
        </div>
      </div>
    )
  }
}

export default Calculator;
