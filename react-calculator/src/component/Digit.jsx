import React, { Component } from "react";

class Digit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="digits flex" onClick={this.props.onClickDigit}>
        <button className="digit">9</button>
        <button className="digit">8</button>
        <button className="digit">7</button>
        <button className="digit">6</button>
        <button className="digit">5</button>
        <button className="digit">4</button>
        <button className="digit">3</button>
        <button className="digit">2</button>
        <button className="digit">1</button>
        <button className="digit">0</button>
      </div>
    );
  }
}

export default Digit;
