import React from 'react';
import Digits from './Digits';
import AllClear from './AllClear';
import Operators from './Operators';

class CalculatorInputField extends React.Component {
  // @TODO: digits 가 눌러졌을 때, 상태를 바꿔주기
  // @TODO: operator 가 눌러졌을 때 상태를 바꿔주기 (=이면 결과값 바꿔주기)

  render() {
    return (
      <>
        <AllClear handleClickAC={this.props.handleClickAC} />
        <Digits handleClickDigit={this.props.handleClickDigit} />
        <Operators />
      </>
    );
  }
}

export default CalculatorInputField;
