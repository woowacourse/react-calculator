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
      result: 0,
    };
  }

  handleClickAC = () => {
    this.setState({
      expression: {
        prevNumber: '',
        operator: '',
        nextNumber: '',
      },
      result: 0,
    });
  };

  handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
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
      ...this.state,
      expression: {
        ...this.state.expression,
        [numberKey]: this.state.expression[numberKey] + selectedDigit,
      },
    });
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
          />
        </div>
      </div>
    );
  }
}

export default App;
