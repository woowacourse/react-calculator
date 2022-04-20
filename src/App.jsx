import './App.css';
import React, { Component } from 'react';
import Button from './components/Button';

class App extends Component {
  // for error
  componentDidMount() {}

  render() {
    const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    return (
      <div className="calculator">
        <h1 id="total">0</h1>
        <div className="digits flex">
          {numbers.map((number, index) => (
            <Button key={index} text={number} className="digit" />
          ))}
        </div>
        <div className="modifiers subgrid">
          <Button className="modifier" text="AC" />
        </div>
        <div className="operations subgrid">
          <Button className="operation" text="/" />
          <Button className="operation" text="X" />
          <Button className="operation" text="/" />
          <Button className="operation" text="+" />
          <Button className="operation" text="=" />
        </div>
      </div>
    );
  }
}

export default App;
