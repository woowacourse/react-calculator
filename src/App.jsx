import './App.css';
import React from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import {
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  LOCAL_STORAGE_EXPRESSION_KEY,
  MAX_NUMBER_LENGTH,
} from './constants';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      prevNumber: '',
      operator: '',
      nextNumber: '',
    };
  }

  handleClickAC = () => {
    this.setState({
      prevNumber: '',
      operator: '',
      nextNumber: '',
    });
  };

  handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    if (this.state.prevNumber === INFINITY_CASE_TEXT) {
      this.setState({
        prevNumber: selectedDigit,
      });
      return;
    }

    this.updateNumber(
      this.state.operator ? 'nextNumber' : 'prevNumber',
      selectedDigit
    );
  };

  updateNumber(numberKey, selectedDigit) {
    if (this.state[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    this.setState({
      [numberKey]: this.state[numberKey] + selectedDigit,
    });
  }

  handleClickOperator = ({ target: { textContent: selectedOperator } }) => {
    const { prevNumber, operator } = this.state;

    if (prevNumber === INFINITY_CASE_TEXT) return;

    if (selectedOperator !== '=' && operator) {
      alert(ERROR_MESSAGE.ALLOW_ONE_OPERATOR);
      return;
    }

    if (selectedOperator !== '=' && !operator) {
      this.setState({
        operator: selectedOperator,
      });
      return;
    }

    if (operator) {
      this.setState((prevState) => ({
        prevNumber: this.calculateExpression(
          prevState.prevNumber,
          prevState.operator,
          prevState.nextNumber
        ),
        operator: '',
        nextNumber: '',
      }));
    }
  };

  calculateExpression(prevNumber, operator, nextNumber) {
    const num1 = Number(prevNumber);
    const num2 = Number(nextNumber);

    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'X':
        return num1 * num2;
      case '/':
        return num2 === 0 ? INFINITY_CASE_TEXT : Number.parseInt(num1 / num2);
      default:
        alert(ERROR_MESSAGE.STRANGE_OPERATOR(operator));
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload);
    window.addEventListener('unload', this.handleUnload);

    try {
      const expression = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_EXPRESSION_KEY)
      );
      if (!expression) return;

      this.setState(expression);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_EXPRESSION_KEY);
      alert(ERROR_MESSAGE.FAIL_TO_GET_DATA);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
    window.removeEventListener('unload', this.handleUnload);
  }

  beforeunload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  handleUnload = () => {
    localStorage.setItem(
      LOCAL_STORAGE_EXPRESSION_KEY,
      JSON.stringify(this.state)
    );
  };

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <CalculationResult expression={this.state} />
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
