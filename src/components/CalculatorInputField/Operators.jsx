import React from 'react';

class Operators extends React.Component {
  render() {
    return (
      <div className="operations subgrid">
        <button className="operation">/</button>
        <button className="operation">X</button>
        <button className="operation">-</button>
        <button className="operation">+</button>
        <button className="operation">=</button>
      </div>
    );
  }
}

export default Operators;
