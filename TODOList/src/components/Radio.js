import React from 'react';

export default function Radio(props) {
  const { id, name, value, checked, onChange } = props;

  return (
    <label>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </label>
  );
}
