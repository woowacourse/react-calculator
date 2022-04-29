import { DIGITS } from '../constants';

export default function DigitButtons({ updateOperandWithNewDigit }) {
  const onClickDigitButton = (e) => {
    const newDigit = e.target.value;
    updateOperandWithNewDigit(newDigit);
  };

  return (
    <div className="digits flex" onClick={onClickDigitButton}>
      {DIGITS.map((digit, index) => (
        <button className="digit" value={digit} key={index}>
          {digit}
        </button>
      ))}
    </div>
  );
}
