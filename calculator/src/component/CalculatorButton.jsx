import PropTypes from 'prop-types';

export default function CalculatorButton({ type, className, handleClick, content }) {
  return (
    <button
      type={type}
      className={className}
      onClick={(e) => {
        handleClick(e.target.textContent);
      }}
    >
      {content}
    </button>
  );
}

CalculatorButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
