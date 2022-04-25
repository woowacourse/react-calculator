import React from 'react';
import Operator from '../types';

type Props = {
  operator: Operator;
  isFocused: boolean;
  onClickOperator: (operator: Operator) => (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function OperatorButton({ isFocused, operator, onClickOperator }: Props) {
  const className = isFocused ? 'operation focused' : 'operation';

  return (
    <button className={className} type="button" onClick={e => onClickOperator(operator)(e)}>
      {operator}
    </button>
  );
}

export default OperatorButton;
