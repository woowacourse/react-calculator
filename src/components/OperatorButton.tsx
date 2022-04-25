import React from 'react';
import Operator from '../types';

type Props = {
  operator: Operator;
  isFocused: boolean;
  onClick: (operator: Operator) => void;
};

function OperatorButton({ isFocused, operator, onClick }: Props) {
  const className = isFocused ? 'operation focused' : 'operation';

  return (
    <button className={className} type="button" onClick={() => onClick(operator)}>
      {operator}
    </button>
  );
}

export default OperatorButton;
