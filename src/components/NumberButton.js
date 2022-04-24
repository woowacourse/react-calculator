import React from 'react';
import {
  NUMBER_LIMIT,
  ERROR_MSG,
  OPERATOR,
  CALCULATOR_INITIAL_STATE,
} from '../constants/constant';

const NumberButton = ({ number, state, setState }) => {
  const { prevNumbers, operator, nextNumbers } = state;

  const onClickNumber = () => {
    const isPrev = operator === '' || operator === OPERATOR.EQUAL;

    if (operator === OPERATOR.EQUAL) {
      setState(CALCULATOR_INITIAL_STATE);
    }

    if (
      (isPrev && prevNumbers.length >= NUMBER_LIMIT) ||
      (!isPrev && nextNumbers.length >= NUMBER_LIMIT)
    ) {
      alert(ERROR_MSG.OVER_NUMBER_LIMIT);
      return;
    }

    isPrev
      ? setState(prevState => ({
          ...prevState,
          prevNumbers: [...prevState.prevNumbers, number],
        }))
      : setState(prevState => ({
          ...prevState,
          nextNumbers: [...prevState.nextNumbers, number],
        }));
  };

  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default NumberButton;
