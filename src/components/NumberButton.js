import React from 'react';
import { NUMBER_LIMIT, ERROR_MSG } from '../constants/constant';

const NumberButton = ({ number, equationState, updateNumbers, clear }) => {
  const { sum, prevNumbers, operator, nextNumbers } = equationState;

  const onClickNumber = () => {
    const isPrev = operator === '';

    if (sum !== '') {
      clear();
    }

    if (
      (isPrev && prevNumbers.length >= NUMBER_LIMIT) ||
      (!isPrev && nextNumbers.length >= NUMBER_LIMIT)
    ) {
      alert(ERROR_MSG.OVER_NUMBER_LIMIT);
      return;
    }

    isPrev
      ? updateNumbers(prevState => ({
          ...prevState,
          prevNumbers: [...prevNumbers, number],
        }))
      : updateNumbers(prevState => ({
          ...prevState,
          nextNumbers: [...nextNumbers, number],
        }));
  };

  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default NumberButton;
