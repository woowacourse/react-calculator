import React from 'react';
import { NUMBER_LIMIT, ERROR_MSG } from '../constants/constant';
import { CALCULATOR_INITIAL_STATE } from '../constants/constant';

const NumberButton = ({ number, state, setState }) => {
  const { sum, prevNumbers, operator, nextNumbers } = state;

  const onClickNumber = () => {
    const isPrev = operator === '';

    if (sum) {
      setState({ ...CALCULATOR_INITIAL_STATE });
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
