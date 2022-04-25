import React from 'react';
import { OPERATOR, CALCULATOR_INITIAL_STATE } from '../constants/constant';

const OperatorButton = ({ selfOperand, state, setState, calculate }) => {
  const { prevNumbers } = state;

  const onClickOperator = () => {
    if (prevNumbers.length === 0) {
      setState({
        ...CALCULATOR_INITIAL_STATE,
        prevNumbers: [0],
        operator: selfOperand,
      });
    }

    if (selfOperand !== OPERATOR.EQUAL) {
      setState(prevState => ({ ...prevState, operator: selfOperand }));
      return;
    }

    calculate();
  };

  return (
    <button className="operation" onClick={onClickOperator}>
      {selfOperand}
    </button>
  );
};

export default OperatorButton;
