import React from 'react';

class Digits extends React.Component {
  render() {
    return (
      <div className="digits flex">
        {Array(10)
          .fill()
          .map((_, digit) => (
            <button
              className="digit"
              key={digit}
              onClick={this.props.handleClickDigit}
            >
              {9 - digit}
            </button>
          ))}
      </div>
    );
  }
}

export default Digits;
