import React from 'react';
import { OPERATORS } from '../../constants';
import Button from '../Button';

function Operators({ handleClickOperator }) {
  return (
    <div className="operators subgrid">
      {Object.values(OPERATORS).map((operator) => (
        <Button
          className="operator"
          handleClick={handleClickOperator}
          key={operator}
        >
          {operator}
        </Button>
      ))}
    </div>
  );
}

export default Operators;
