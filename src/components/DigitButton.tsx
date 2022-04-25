import React from 'react';

type Props = {
  digit: number;
  onClick: (digit: number) => void;
};

function DigitButton({ digit, onClick }: Props) {
  return (
    <button className="digit" type="button" onClick={() => onClick(digit)}>
      {digit}
    </button>
  );
}

export default DigitButton;
