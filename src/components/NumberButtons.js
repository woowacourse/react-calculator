import React from 'react';
import { NUMBER_LIMIT, ERROR_MSG } from '../constants/constant';

const NumberButtons = ({ number, state, setPrevNumbers, setNextNumbers }) => {
  const { prevNumbers, operator, nextNumbers } = state;

  const onClickNumber = () => {
    const isPrev = operator === '';

    if (
      (isPrev && prevNumbers.length >= NUMBER_LIMIT) ||
      (!isPrev && nextNumbers.length >= NUMBER_LIMIT)
    ) {
      alert(ERROR_MSG.OVER_NUMBER_LIMIT);
      return;
    }

    if (isPrev) {
      setPrevNumbers([...prevNumbers, number]);
      return;
    }

    setNextNumbers([...nextNumbers, number]);
  };

  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default NumberButtons;
