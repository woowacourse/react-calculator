import { DIGITS } from '../constants';

export default function DigitButtons({ updateOperandWithNewDigit }) {
  return (
    <div className="digits flex">
      {DIGITS.map((digit, index) => (
        <button
          className="digit"
          key={index}
          onClick={() => {
            updateOperandWithNewDigit(digit);
          }}
        >
          {digit}
        </button>
      ))}
    </div>
  );
}
