import PropTypes from 'prop-types';
import React from 'react';
import Button from './Button';

export default function Keypad({ className, keyClassName, keypad, onClick }) {
  return (
    <div className={className}>
      {keypad.map((key) => (
        <Button
          key={key}
          className={keyClassName}
          onClick={onClick}
          text={key.toString()}
        />
      ))}
    </div>
  );
}
Keypad.propTypes = {
  className: PropTypes.string,
  keyClassName: PropTypes.string,
  keypad: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]),
  onClick: PropTypes.func,
};
