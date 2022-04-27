import React from 'react';
import { OPERATOR, EQUATION_INITIAL_STATE } from '../constants/constant';

const OperatorButton = props => {
  const { selfOperand, prevNumbers, updateOperator, calculate } = props;

  const onClickOperator = () => {
    if (prevNumbers.length === 0) {
      updateOperator({
        ...EQUATION_INITIAL_STATE,
        prevNumbers: [0],
        operator: selfOperand,
      });
    }

    if (selfOperand !== OPERATOR.EQUAL) {
      updateOperator(prevState => ({ ...prevState, operator: selfOperand }));
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
