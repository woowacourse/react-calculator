import React from 'react';
import Operator from '../types';

type Props = {
  operator: Operator;
  isFocused: boolean;
  onClickOperator: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function OperatorButton({ isFocused, operator, onClickOperator }: Props) {
  const className = isFocused ? 'operation focused' : 'operation';

  return (
    <button className={className} type="button" data-operator={operator} onClick={onClickOperator}>
      {operator}
    </button>
  );
}

export default OperatorButton;
