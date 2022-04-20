import React, { Component } from 'react';

class Screen extends Component {
  render() {
    const { prevNumber, operator, nextNumber, sum } = this.props.state;

    return (
      <h1 className='total'>{sum === '' ? [...prevNumber, ...operator, ...nextNumber] : sum}</h1>
    );
  }
}

export default Screen;
