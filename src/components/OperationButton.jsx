/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable func-names */
import ALERT from '../constants/alertMessage';
import calculate from '../core/calculate';

const OperationButton = function (props) {
  const { operand, operation, operator, setOperand, setOperator, setIndex, setIsCalculated } =
    props;
  let tempOperand = null;
  let tempOperator = null;
  let tempIndex = null;
  let tempIsCalculated = false;

  const handleClickOperation = () => {
    if (operand[0] === '오류') {
      alert(ALERT.INFINITY);
      return;
    }

    if (operator && operation !== '=') {
      alert(ALERT.OPERATOR_EXIST);
      return;
    }

    if (operator && operation === '=') {
      [tempOperand, tempOperator, tempIndex] = calculate(operand, operator);
      tempIsCalculated = true;
    }

    if (!operator) {
      tempOperand = operand;
      tempOperator = operation;
      tempIndex = 1;
    }

    setOperand(tempOperand);
    setOperator(tempOperator);
    setIndex(tempIndex);
    setIsCalculated(tempIsCalculated);
  };

  return (
    <button type="button" className="operation" onClick={handleClickOperation}>
      {operation}
    </button>
  );
};

export default OperationButton;
