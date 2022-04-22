import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from './Button';

export default class Keypad extends Component {
  render() {
    const { className, keyClassName, keypad, onClick } = this.props;

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
