function calculateResult(operand, operator) {
  switch (operator) {
    case '+':
      return +operand[0] + +operand[1];
    case '-':
      return +operand[0] - +operand[1];
    case 'X':
      return +operand[0] * +operand[1];
    case '/':
      return Math.floor(+operand[0] / +operand[1]);
    default:
      return '오류';
  }
}

export default calculateResult;
