import { DIGITS } from './constants';

function DigitButtonContainer({ handleNumber }) {
  return (
    <div className="digits flex" onClick={handleNumber}>
      {DIGITS.map((digit) => (
        <button className="digit" data-number={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default DigitButtonContainer;
