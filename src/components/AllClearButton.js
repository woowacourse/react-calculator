import React from 'react';

const AllClearButton = ({ clear }) => {
  const onClickAllClear = () => {
    clear();
  };

  return (
    <button className="modifier" onClick={onClickAllClear}>
      AC
    </button>
  );
};

export default AllClearButton;
