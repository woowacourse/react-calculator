import PropTypes from 'prop-types';

export default function CalculatorButton({ className, handleClick, content }) {
  return (
    <button
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
  className: PropTypes.string,
  handleClick: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
