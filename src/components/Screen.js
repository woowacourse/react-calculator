import React from 'react';

const Screen = ({ state }) => {
  const { prevNumbers, operator, nextNumbers, sum } = state;

  return (
    <h1 className="total">{sum === '' ? [...prevNumbers, ...operator, ...nextNumbers] : sum}</h1>
  );
};

export default Screen;
