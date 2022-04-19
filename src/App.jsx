import './App.css';
import React from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <div className="calculator">
          <CalculationResult />
          <CalculatorInputField />
        </div>
      </div>
    );
  }
}

export default App;
