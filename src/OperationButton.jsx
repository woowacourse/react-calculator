/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable func-names */
const calculate = function (props) {
  const { operand, operator } = props;
  let result = null;
  switch (operator) {
    case '+':
      result = +operand[0] + +operand[1];
      break;
    case '-':
      result = +operand[0] - +operand[1];
      break;
    case 'X':
      result = +operand[0] * +operand[1];
      break;
    case '/':
      result = Math.floor(+operand[0] / +operand[1]);
      break;
    default:
      break;
  }

  if (result === Infinity) {
    return [['오류', ''], '', 0];
  }

  return [[String(result), ''], '', 0];
};

const OperationButton = function (props) {
  const { operand, operation, operator, setOperand, setOperator, setIndex } = props;
  let tempOperand = null;
  let tempOperator = null;
  let tempIndex = null;

  const handleClickOperation = () => {
    if (operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }
    if (operator && operation !== '=') {
      return;
    }
    if (operator && operation === '=') {
      [tempOperand, tempOperator, tempIndex] = calculate(props);
    }
    if (!operator) {
      tempOperand = operand;
      tempOperator = operation;
      tempIndex = 1;
    }

    setOperand(tempOperand);
    setOperator(tempOperator);
    setIndex(tempIndex);
  };

  return (
    <button type="button" className="operation" onClick={handleClickOperation}>
      {operation}
    </button>
  );
};

export default OperationButton;
