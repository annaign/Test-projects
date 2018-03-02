import React from "react";

export default function TextBox(props) {
  const onChange = props.onChange;
  const value = props.value || "";

  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      autoFocus
    />
  );
}
