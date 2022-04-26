import React from "react";

export default function DisplayResult(props) {
  return <h1 id="total">{props.result.toString()}</h1>;
}
