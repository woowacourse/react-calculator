import React from 'react';

const OperationButton = (props) => {
  const { children, currentOperator, setOperator } = props;

  return (
    <button
      className={'operation' + ((currentOperator === children && ' pressed') || '')}
      onClick={() => {
        setOperator(children);
      }}
    >
      {children}
    </button>
  );
};

export default OperationButton;
