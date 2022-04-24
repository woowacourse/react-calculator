// eslint-disable-next-line react/prop-types
const Expression = ({ isError, firstOperand, operation, secondOperand }) => {
  return (
    <h1 id="total">
      {isError
        ? '오류'
        : `${firstOperand}
          ${operation ?? ''}
          ${secondOperand < 0 ? '' : secondOperand}`}
    </h1>
  );
};

export default Expression;
