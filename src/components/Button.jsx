import React from 'react';

function Button({ className, handleClick, children: text }) {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
