/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/react-in-jsx-scope */

const Result = function (props) {
  const { operand } = props;
  const { operator } = props;

  return (
    <h1 id="total">
      {operand[0]}
      {operator}
      {operand[1]}
    </h1>
  );
};

export default Result;
