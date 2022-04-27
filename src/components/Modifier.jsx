import React from 'react';

function Modifier(props) {
  return (
    <button type="button" className="modifier" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Modifier;
