import React from 'react';

function Operation(props) {
  return (
    <button
      type="button"
      className="operation"
      onClick={() => {
        props.onClick(props.operator);
      }}
    >
      {props.children}
    </button>
  );
}

export default Operation;
