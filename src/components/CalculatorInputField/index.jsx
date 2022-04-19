import React from 'react';
import Digits from './Digits';
import AllClear from './AllClear';
import Operators from './Operators';

class CalculatorInputField extends React.Component {
  render() {
    return (
      <>
        <AllClear />
        <Digits />
        <Operators />
      </>
    );
  }
}

export default CalculatorInputField;
