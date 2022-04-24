const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
// eslint-disable-next-line react/prop-types
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

export default Digits;
