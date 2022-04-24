/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/react-in-jsx-scope */

const OperationButton = function (props) {
  const { operand, operation, operator, setOperator, setIndex } = props;
  const handleClickOperation = () => {
    if (operand[0] === '오류') {
      alert('오류입니다. AC를 눌러 값을 초기화해주세요.');
      return;
    }

    if (operation === '=') {
      // 계산하기
      console.log('calculation!');
      return;
    }

    if (operator) {
      return;
    }

    setOperator(operation);
    setIndex(1);
  };

  return (
    <button type="button" className="operation" onClick={handleClickOperation}>
      {operation}
    </button>
  );
};

export default OperationButton;
