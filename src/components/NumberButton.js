import React from 'react';
import { NUMBER_LIMIT, ERROR_MSG } from '../constants/constant';
import { CALCULATOR_INITIAL_STATE } from '../constants/constant';

const NumberButton = ({ number, equationState, setEquationState }) => {
  const { sum, prevNumbers, operator, nextNumbers } = equationState;

  const onClickNumber = () => {
    const isPrev = operator === '';

    if (sum !== '') {
      setEquationState({ ...CALCULATOR_INITIAL_STATE });
    }

    if (
      (isPrev && prevNumbers.length >= NUMBER_LIMIT) ||
      (!isPrev && nextNumbers.length >= NUMBER_LIMIT)
    ) {
      alert(ERROR_MSG.OVER_NUMBER_LIMIT);
      return;
    }

    isPrev
      ? setEquationState(prevState => ({
          ...prevState,
          prevNumbers: [...prevState.prevNumbers, number],
        }))
      : setEquationState(prevState => ({
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
