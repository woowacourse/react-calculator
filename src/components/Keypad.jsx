import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

const Keypad = ({
  className,
  keyClassName,
  keypad,
  onClick,
  highlightIf = () => false,
}) => {
  return (
    <div className={className}>
      {keypad.map((key) => (
        <Button
          key={key}
          className={
            highlightIf(key) ? `${keyClassName} highlight` : keyClassName
          }
          onClick={onClick}
        >
          {key.toString()}
        </Button>
      ))}
    </div>
  );
};

Keypad.propTypes = {
  className: PropTypes.string,
  keyClassName: PropTypes.string,
  keypad: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  onClick: PropTypes.func,
  highlightIf: PropTypes.func,
};

export default Keypad;
