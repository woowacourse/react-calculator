import './App.css';
import React from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import { ERROR_MESSAGE, MAX_NUMBER_LENGTH } from './constants';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      expression: {
        prevNumber: '',
        operator: '',
        nextNumber: '',
      },
    };
  }

  handleClickAC = () => {
    this.setState({
      expression: {
        prevNumber: '',
        operator: '',
        nextNumber: '',
      },
    });
  };

  handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    if (this.state.expression.prevNumber === '오류') {
      this.setState({
        expression: {
          ...this.state.expression,
          prevNumber: selectedDigit,
        },
      });
      return;
    }

    this.updateNumber(
      this.state.expression.operator ? 'nextNumber' : 'prevNumber',
      selectedDigit
    );
  };

  updateNumber(numberKey, selectedDigit) {
    if (this.state.expression[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    this.setState({
      expression: {
        ...this.state.expression,
        [numberKey]: this.state.expression[numberKey] + selectedDigit,
      },
    });
  }

  handleClickOperator = ({ target: { textContent: selectedOperator } }) => {
    const { prevNumber, operator, nextNumber } = this.state.expression;

    if (prevNumber === '오류') return;

    if (selectedOperator !== '=') {
      if (operator) {
        alert('연산자는 하나만 입력할 수 있습니다.');
        return;
      }
      this.setState({
        expression: {
          ...this.state.expression,
          operator: selectedOperator,
        },
      });
      return;
    }

    if (operator) {
      this.setState({
        expression: {
          prevNumber: this.calculateExpression(
            prevNumber,
            operator,
            nextNumber
          ),
          operator: '',
          nextNumber: '',
        },
      });
    }
  };

  calculateExpression(prevNumber, operator, nextNumber) {
    const num1 = Number(prevNumber);
    const num2 = Number(nextNumber);

    switch (operator) {
      case '+':
        return this.add(num1, num2);
      case '-':
        return this.minus(num1, num2);
      case 'X':
        return this.multiply(num1, num2);
      case '/':
        return this.divide(num1, num2);
      default:
        alert(`${operator} 연산자는 존재하지 않습니다`);
    }
  }

  add(num1, num2) {
    return num1 + num2;
  }
  minus(num1, num2) {
    return num1 - num2;
  }
  multiply(num1, num2) {
    return num1 * num2;
  }
  divide(num1, num2) {
    if (num2 === 0) return '오류';

    return Number.parseInt(num1 / num2);
  }

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <CalculationResult
            expression={this.state.expression}
            result={this.state.result}
          />
          <CalculatorInputField
            handleClickAC={this.handleClickAC}
            handleClickDigit={this.handleClickDigit}
            handleClickOperator={this.handleClickOperator}
          />
        </div>
      </div>
    );
  }
}

export default App;
