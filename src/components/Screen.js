import React from 'react';

const Screen = ({ equationState }) => {
  const { prevNumbers, operator, nextNumbers, sum } = equationState;

  return (
    <h1 className="total">
      {sum === '' ? [...prevNumbers, ...operator, ...nextNumbers] : sum}
    </h1>
  );
};

export default Screen;
