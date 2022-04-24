import React from 'react';

function Result(props) {
  return (
    <h1 id="total">
      {props.operand[0]}
      {props.operator}
      {props.operand[1]}
    </h1>
  );
}

export default Result;
