import React from 'react';
import { EQUATION_INITIAL_STATE } from '../constants/constant';

const AllClearButton = ({ clear }) => {
  const onClickAllClear = () => {
    clear(EQUATION_INITIAL_STATE);
  };

  return (
    <button className="modifier" onClick={onClickAllClear}>
      AC
    </button>
  );
};

export default AllClearButton;
