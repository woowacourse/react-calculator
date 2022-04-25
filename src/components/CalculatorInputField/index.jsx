import React from 'react';
import Digits from './Digits';
import AllClear from './AllClear';
import Operators from './Operators';

function CalculatorInputField({
  handleClickAC,
  handleClickDigit,
  handleClickOperator,
}) {
  return (
    <>
      <AllClear handleClickAC={handleClickAC} />
      <Digits handleClickDigit={handleClickDigit} />
      <Operators handleClickOperator={handleClickOperator} />
    </>
  );
}

export default CalculatorInputField;
