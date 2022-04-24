import React from 'react';
import { OPERATOR, ERROR_MSG } from '../constants/constant';

const OperatorButton = ({ operand, state, setState }) => {
  const { prevNumbers, operator, nextNumbers } = state;

  const onClickOperator = () => {
    if (operand !== OPERATOR.EQUAL) {
      setState(prevState => ({ ...prevState, operator: operand }));
      return;
    }

    setState(prevState => ({
      ...prevState,
      sum: calculateSum(),
      operator: operand,
    }));
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
      {operand}
    </button>
  );
};

export default OperatorButton;
