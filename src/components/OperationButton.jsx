import React from 'react';
import PropTypes from 'prop-types';

const OperationButton = (props) => {
  const { children, currentOperator, clickHandler } = props;

  const handleClick = () => {
    clickHandler(children);
  };

  return (
    <button
      className={'operation' + ((currentOperator === children && ' pressed') || '')}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default OperationButton;

OperationButton.propTypes = {
  children: PropTypes.string.isRequired,
  currentOperator: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};
