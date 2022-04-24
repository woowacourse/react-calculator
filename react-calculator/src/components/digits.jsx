import React from 'react';

function Digits(props) {
  const handleDigitButtonClick = (e) => {
    props.handleDigit(e.target.textContent);
  };

  return (
    <div className="digits flex">
      <button className="digit" onClick={handleDigitButtonClick}>
        9
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        8
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        7
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        6
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        5
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        4
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        3
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        2
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        1
      </button>
      <button className="digit" onClick={handleDigitButtonClick}>
        0
      </button>
    </div>
  );
}

export default Digits;
