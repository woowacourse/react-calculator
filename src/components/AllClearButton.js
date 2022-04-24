import React from 'react';
import { CALCULATOR_INITIAL_STATE } from '../constants/constant';

const AllClearButton = ({ setState }) => {
  const onClickAllClear = () => {
    setState(CALCULATOR_INITIAL_STATE);
  };

  return (
    <button className="modifier" onClick={onClickAllClear}>
      AC
    </button>
  );
};

export default AllClearButton;
