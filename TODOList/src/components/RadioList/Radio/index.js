import React from 'react';
import './style.css';

export default function Radio(props) {
  const { id, name, value, checked, onChange } = props;

  return (
    <label className="radioBtn">
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
