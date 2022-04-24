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
      {props.operator}
    </button>
  );
}

export default Operation;
