import React from 'react';
import PropTypes from 'prop-types';

const DigitButton = (props) => {
  const { clickHandler, digit } = props;

  const handleClick = () => {
    clickHandler(digit);
  };

  return (
    <button className="digit" onClick={handleClick}>
      {digit}
    </button>
  );
};

DigitButton.propTypes = {
  clickHandler: PropTypes.func,
  digit: PropTypes.number,
};

export default DigitButton;
