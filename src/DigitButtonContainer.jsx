import { DIGITS } from './constants';

function DigitButtonContainer({ updateOperandWithNewDigit }) {
  const onClickDigitButton = (e) => {
    const newDigit = e.target.value;
    updateOperandWithNewDigit(newDigit);
  };

  return (
    <div className="digits flex" onClick={onClickDigitButton}>
      {DIGITS.map((digit) => (
        <button className="digit" value={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default DigitButtonContainer;
