import PropTypes from 'prop-types';

const DIGIT_LIST = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function DigitButton({ onClickDigit }) {
  return (
    <div className="digits flex">
      {DIGIT_LIST.map((digit) => (
        <button type="button" key={digit} className="digit" onClick={() => onClickDigit(digit)}>
          {digit}
        </button>
      ))}
    </div>
  );
}

DigitButton.propTypes = {
  onClickDigit: PropTypes.func.isRequired,
};

export default DigitButton;
