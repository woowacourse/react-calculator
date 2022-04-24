import ACButtonContainer from './ACButtonContainer';
import DigitButtonContainer from './DigitButtonContainer';
import OperatorButtonContainer from './OperatorButtonContainer';

function InputField({ updateOperandWithNewDigit, updateOperation, resetExpression }) {
  return (
    <>
      <DigitButtonContainer updateOperandWithNewDigit={updateOperandWithNewDigit} />
      <ACButtonContainer resetExpression={resetExpression} />
      <OperatorButtonContainer updateOperation={updateOperation} />
    </>
  );
}

export default InputField;
