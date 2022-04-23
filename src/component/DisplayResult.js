import { Component } from "react";

export default class DisplayResult extends Component {
  render() {
    return <h1 id="total">{this.props.result.toString()}</h1>;
  }
}
