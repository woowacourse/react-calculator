import React from 'react';
import { NUMBER_LIMIT, ERROR_MSG } from '../constants/constant';
import { EQUATION_INITIAL_STATE } from '../constants/constant';

const NumberButton = ({ number, equationState, setEquationState }) => {
  const { sum, prevNumbers, operator, nextNumbers } = equationState;

  const onClickNumber = () => {
    const isPrev = operator === '';

    if (sum !== '') {
      setEquationState({ EQUATION_INITIAL_STATE });
    }

    if (
      (isPrev && prevNumbers.length >= NUMBER_LIMIT) ||
      (!isPrev && nextNumbers.length >= NUMBER_LIMIT)
    ) {
      alert(ERROR_MSG.OVER_NUMBER_LIMIT);
      return;
    }

    isPrev
      ? setEquationState({
          ...equationState,
          prevNumbers: [...prevNumbers, number],
        })
      : setEquationState({
          ...equationState,
          nextNumbers: [...nextNumbers, number],
        });
  };

  return (
    <button className="digit" onClick={onClickNumber}>
      {number}
    </button>
  );
};

export default NumberButton;
