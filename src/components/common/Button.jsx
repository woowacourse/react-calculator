import React from 'react';

function Button({ text, className }) {
  return (
    <button type="button" className={className}>
      {text}
    </button>
  );
}

export default Button;
