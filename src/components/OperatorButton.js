import React from 'react';
import { OPERATOR, ERROR_MSG, INITIAL_STATE } from '../constants/constant';

const OperatorButton = ({ selfOperand, state, setState }) => {
  const { prevNumbers, operator, nextNumbers } = state;

  const onClickOperator = () => {
    if (selfOperand !== OPERATOR.EQUAL) {
      setState(prevState => ({ ...prevState, operator: selfOperand }));
      return;
    }

    setState({
      ...INITIAL_STATE,
      sum: calculateSum(),
      operator: selfOperand,
    });
  };

  const calculateSum = () => {
    const prevNumber = Number(prevNumbers.join(''));
    const nextNumber = Number(nextNumbers.join(''));

    switch (operator) {
      case OPERATOR.PLUS:
        return prevNumber + nextNumber;
      case OPERATOR.SUBSTRACT:
        return prevNumber - nextNumber;
      case OPERATOR.MULTI:
        return prevNumber * nextNumber;
      case OPERATOR.DIVIDE:
        if (!isFinite(prevNumber / nextNumber)) {
          return ERROR_MSG.INFINITY;
        }
        return Math.floor(prevNumber / nextNumber);
      default:
        return prevNumber;
    }
  };

  return (
    <button className="operation" onClick={onClickOperator}>
      {selfOperand}
    </button>
  );
};

export default OperatorButton;
