import React from 'react';
import PropTypes from 'prop-types';

const ACButton = (props) => {
  const { children, clickHandler } = props;

  const handleClick = () => {
    clickHandler(children);
  };

  return (
    <button className="modifier" onClick={handleClick}>
      {children}
    </button>
  );
};

export default ACButton;

ACButton.propTypes = {
  children: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
