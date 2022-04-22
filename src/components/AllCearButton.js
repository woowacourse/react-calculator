import React from 'react';

const AllClearButton = ({ set }) => {
  const { setSum, setNextNumbers, setOperator, setPrevNumbers } = set;

  const onClickAllClear = () => {
    setSum('');
    setPrevNumbers([]);
    setOperator('');
    setNextNumbers([]);
  };

  return (
    <button className="modifier" onClick={onClickAllClear}>
      AC
    </button>
  );
};

export default AllClearButton;
