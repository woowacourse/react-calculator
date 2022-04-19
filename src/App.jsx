import './App.css';
import React from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';

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

  render() {
    return (
      <div id="app">
        <div className="calculator">
          <CalculationResult expression={this.state.expression} result={this.state.result} />
          <CalculatorInputField handleClickAC={this.handleClickAC} />
        </div>
      </div>
    );
  }
}

export default App;
