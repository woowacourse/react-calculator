import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ className, onClick, children }) => {
  return (
    <button
      className={className}
      onClick={() => {
        onClick(children);
      }}
      type="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
};

export default Button;
