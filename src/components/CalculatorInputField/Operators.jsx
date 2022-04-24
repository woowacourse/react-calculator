import React from 'react';
import { OPERATORS } from '../../constants';
import Button from '../Button';

function Operators({ handleClickOperator }) {
  return (
    <div className="operations subgrid">
      {OPERATORS.map((operator) => (
        <Button
          className="operation"
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
