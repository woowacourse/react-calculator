/* eslint-disable func-names */
const calculate = function (operand, operator) {
  const numOperand = [+operand[0], +operand[1]];
  let result = null;

  switch (operator) {
    case '+':
      result = numOperand[0] + numOperand[1];
      break;
    case '-':
      result = numOperand[0] - numOperand[1];
      break;
    case 'X':
      result = numOperand[0] * numOperand[1];
      break;
    case '/':
      result = Math.floor(numOperand[0] / numOperand[1]);
      break;
    default:
      break;
  }

  if (result === Infinity) {
    return [['오류', ''], '', 0];
  }

  return [[String(result), ''], '', 0];
};

export default calculate;
