import ACButtonContainer from './ACButtonContainer';
import DigitButtonContainer from './DigitButtonContainer';
import OperatorButtonContainer from './OperatorButtonContainer';

function InputField({ handleNumber, handleOperation, clearResult }) {
  return (
    <>
      <DigitButtonContainer handleNumber={handleNumber} />
      <ACButtonContainer clearResult={clearResult} />
      <OperatorButtonContainer handleOperation={handleOperation} />
    </>
  );
}

export default InputField;
