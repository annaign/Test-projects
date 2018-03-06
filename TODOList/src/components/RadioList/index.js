import React from 'react';
import Radio from './Radio';
import './style.css';

export default function RadioList(props) {
  const { name, value, radioConfig, onChangeRadio } = props;

  const onChangeHandle = e => {
    onChangeRadio(e.target.id);
  };

  return (
    <div className="radioList">
      {radioConfig.map((element, index) => {
        return (
          <Radio
            key={`${index}${element.value}`}
            id={index}
            name={name}
            value={element.label}
            checked={index == value}
            onChange={onChangeHandle}
          />
        );
      })}
    </div>
  );
}
