/* eslint-disable react/prop-types */
export default function Button(props) {
  return (
    <button className={props.class} onClick={props.onClick}>
      {props.content}
    </button>
  );
}
