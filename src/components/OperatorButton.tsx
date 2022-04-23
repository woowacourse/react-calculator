import React from 'react';
import Operator from '../types';

type Props = {
  operator: Operator;
  onClickOperator: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function OperatorButton({ operator, onClickOperator }: Props) {
  return (
    <button className="operation" type="button" data-operator={operator} onClick={onClickOperator}>
      {operator}
    </button>
  );
}

export default OperatorButton;
