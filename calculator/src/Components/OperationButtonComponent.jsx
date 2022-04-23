import React, { Component } from "react";

export default class OperationButtonComponent extends Component {
  render() {
    const className = this.props.isFocused ? "operation--focused" : "operation";
    return <button className={className}>{this.props.operation}</button>;
  }
}
