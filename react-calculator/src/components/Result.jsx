function Result({ result, resultRef }) {
  return (
    <h1 id="calculator-number" ref={resultRef}>
      {result}
    </h1>
  );
}

export default Result;
