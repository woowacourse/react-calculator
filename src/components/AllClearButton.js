import React from 'react';
import { INITIAL_STATE } from '../constants/constant';

const AllClearButton = ({ setState }) => {
  const onClickAllClear = () => {
    setState(INITIAL_STATE);
  };

  return (
    <button className="modifier" onClick={onClickAllClear}>
      AC
    </button>
  );
};

export default AllClearButton;
