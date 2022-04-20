import React, { Component } from "react";

export default class DisplayResult extends Component {
  render() {
    return <h1 id="total">{this.props.result}</h1>;
  }
}
