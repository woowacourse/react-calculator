import React from 'react';
import { OPERATOR, ERROR_MSG } from '../constants/constant';

const OperatorButton = ({ operand, state, set }) => {
  const { prevNumbers, operator, nextNumbers } = state;
  const { setSum, setOperator } = set;

  const onClickOperator = () => {
    const prevNumber = Number(prevNumbers.join(''));
    const nextNumber = Number(nextNumbers.join(''));

    if (operand !== OPERATOR.EQUAL) {
      setOperator(operand);
      return;
    }

    switch (operator) {
      case OPERATOR.PLUS:
        setSum(prevNumber + nextNumber);
        break;
      case OPERATOR.SUBSTRACT:
        setSum(prevNumber - nextNumber);
        break;
      case OPERATOR.MULTI:
        setSum(prevNumber * nextNumber);
        break;
      case OPERATOR.DIVIDE:
        if (!isFinite(prevNumber / nextNumber)) {
          setSum(ERROR_MSG.INFINITY);
          break;
        }
        setSum(Math.floor(prevNumber / nextNumber));
    }
  };

  return (
    <button className="operation" onClick={onClickOperator}>
      {operand}
    </button>
  );
};

export default OperatorButton;
