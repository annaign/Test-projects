import React from 'react';
import Radio from './Radio';

export default function RadioList(props) {
  console.log(props);
  const { name, value, radioConfig, onChangeRadio } = props;

  const onChangeHandle = e => {
    console.log(e.target);
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
