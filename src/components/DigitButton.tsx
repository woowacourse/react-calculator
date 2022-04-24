import React from 'react';

type Props = {
  digit: number;
  onClickDigitBtn: (digit: number) => (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function DigitButton({ digit, onClickDigitBtn }: Props) {
  return (
    <button className="digit" type="button" onClick={e => onClickDigitBtn(digit)(e)}>
      {digit}
    </button>
  );
}

export default DigitButton;
