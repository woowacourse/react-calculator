import React from 'react';

class Digits extends React.Component {
  render() {
    return (
      <div className="digits flex">
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((digit) => (
          <button
            className="digit"
            key={digit}
            onClick={this.props.handleClickDigit}
          >
            {digit}
          </button>
        ))}
      </div>
    );
  }
}

export default Digits;
