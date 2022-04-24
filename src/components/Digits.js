import PropTypes from 'prop-types';
const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const Digits = ({ onClick }) => {
  return (
    <div className="digits flex">
      {DIGITS.map((digit) => (
        <button className="digit" onClick={onClick(digit)} key={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
};

Digits.propTypes = {
  onClick: PropTypes.func,
};

export default Digits;
