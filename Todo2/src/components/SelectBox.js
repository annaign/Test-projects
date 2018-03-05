import React from 'react';

export default function SelectBox(props) {
  const { options, value, onChange } = props;

  return (
    <select
      multiple={false}
      value={value}
      size="3"
      onChange={e => onChange(e.target.value)}
    >
      {options.map(item => {
        return (
          <option key={`${item.value}${item.label}`} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}
