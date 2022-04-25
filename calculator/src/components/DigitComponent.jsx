const digitList = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

const DigitComponent = ({ handleDigitButton }) => {
  return (
    <>
      <div className="digits flex" onClick={handleDigitButton}>
        {digitList.map((digit) => (
          <button className="digit" key={digit}>{digit}</button>
        ))}
      </div>
    </>
  )
}

export default DigitComponent;
