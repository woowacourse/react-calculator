function Result(props) {
  const { result, resultRef } = props;

  return (
    <h1 id="calculator-number" ref={resultRef}>
      {result}
    </h1>
  );
}

export default Result;
