import './Digit.scss';

export default function Digit({ setNumberState }) {
  const handleDigitButtonClick = ({ target }) => {
    setNumberState(target.textContent);
  };

  return (
    <div className="digits flex" onClick={handleDigitButtonClick}>
      {Array.from(Array(10).keys())
        .reverse()
        .map(digit => (
          <button className="digit" key={digit}>
            {digit}
          </button>
        ))}
    </div>
  );
}
