import PropTypes from 'prop-types';

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

Expression.propTypes = {
  isError: PropTypes.bool,
  firstOperand: PropTypes.number,
  secondOperand: PropTypes.number,
  operation: PropTypes.string,
};
export default Expression;
