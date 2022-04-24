import { DIGITS } from '../constants';

function DigitButtonContainer({ updateOperandWithNewDigit }) {
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

export default DigitButtonContainer;
