import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ className, text, onClick }) {
  return (
    <button
      className={className}
      onClick={() => {
        onClick(text);
      }}
      type="button"
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};
