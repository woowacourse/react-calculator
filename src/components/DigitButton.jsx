/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/react-in-jsx-scope */
import ALERT from '../constants/alertMessage';

const DigitButton = function (props) {
  const { digit, operand, setOperand, index } = props;
  const handleClickDigit = () => {
    let operandList = null;

    if (operand[0] === '오류') {
      alert(ALERT.INFINITY);
      return;
    }

    if (+(operand[index] + digit) >= 1000) {
      alert(ALERT.MAX_DIGIT);
      return;
    }

    switch (index) {
      case 0:
        operandList = [String(+(operand[0] + digit)), ''];
        break;

      case 1:
        operandList = [operand[0], String(+(operand[1] + digit))];
        break;

      default:
        break;
    }

    setOperand(operandList);
  };

  return (
    <button className="digit" type="button" onClick={handleClickDigit}>
      {digit}
    </button>
  );
};

export default DigitButton;
