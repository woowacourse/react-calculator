/* eslint-disable func-names */
/* eslint-disable react/react-in-jsx-scope */
const ModifierButton = function (props) {
  const { setOperand, setOperator, setIndex } = props;
  const handleClickModifier = () => {
    setOperand(['0', '']);
    setOperator('');
    setIndex(0);
  };

  return (
    <button type="button" className="modifier" onClick={handleClickModifier}>
      AC
    </button>
  );
};

export default ModifierButton;
