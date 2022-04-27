const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function DigitButtons({ setNumbers }) {
  const handleNumber = (e) => {
    setNumbers(e.target.dataset.number);
  };

  return (
    <div className="digits flex" onClick={handleNumber}>
      {DIGITS.map((digit) => (
        <button key={digit} className="digit" data-number={digit}>
          {digit}
        </button>
      ))}
    </div>
  );
}

export default DigitButtons;
