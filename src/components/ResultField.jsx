function ResultField({ expression }) {
  const { firstOperand, operator, secondOperand } = expression;

  return <h1 id="total">{firstOperand + operator + secondOperand}</h1>;
}

export default ResultField;
