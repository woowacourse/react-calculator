import React from 'react';
import Digits from './Digits';
import AllClear from './AllClear';
import Operators from './Operators';

class CalculatorInputField extends React.Component {
  render() {
    return (
      <>
        <AllClear handleClickAC={this.props.handleClickAC} />
        <Digits handleClickDigit={this.props.handleClickDigit} />
        <Operators handleClickOperator={this.props.handleClickOperator} />
      </>
    );
  }
}

export default CalculatorInputField;
