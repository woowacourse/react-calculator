/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/react-in-jsx-scope */
const DigitButton = function (props) {
  const { digit, operand, setOperand, index } = props;
  const handleClickDigit = () => {
    let operandList = null;

    if (operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (+(operand[index] + digit) >= 1000) {
      alert('숫자는 한번에 최대 3자리 수까지 입력 가능합니다.');
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
