import React from 'react';
import { OPERATOR, CALCULATOR_INITIAL_STATE } from '../constants/constant';

const OperatorButton = props => {
  const { selfOperand, prevNumbers, setEquationState, calculate } = props;

  const onClickOperator = () => {
    if (prevNumbers.length === 0) {
      setEquationState({
        ...CALCULATOR_INITIAL_STATE,
        prevNumbers: [0],
        operator: selfOperand,
      });
    }

    if (selfOperand !== OPERATOR.EQUAL) {
      setEquationState(prevState => ({ ...prevState, operator: selfOperand }));
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
