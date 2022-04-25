function Digits() {
  return Array.from(Array(10).keys())
    .reverse()
    .map((digit, idx) => (
      <button className='digit' key={idx}>
        {digit}
      </button>
    ));
}

export default Digits;
