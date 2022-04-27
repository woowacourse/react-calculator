import { memo } from "react";

const ClearButton = ({ onClickModifier }) => {
  return (
    <button className="modifier" onClick={onClickModifier}>
      AC
    </button>
  );
};

export default memo(ClearButton);
