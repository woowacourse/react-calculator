import React from 'react';

type Props = {
  digit: number;
  onClickDigitBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function DigitButton({ digit, onClickDigitBtn }: Props) {
  return (
    <button className="digit" type="button" data-digit={digit} onClick={onClickDigitBtn}>
      {digit}
    </button>
  );
}

export default DigitButton;
