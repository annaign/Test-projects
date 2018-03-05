import React from 'react';
import Radio from '../components/Radio';
import priorities from '../constants';

export default class TodoRadioList extends React.Component {
  onChangeHandle = e => {
    this.props.onChangePriority(e.target.id);
  };

  render() {
    const { name, value } = this.props;
    const radioConfig = this.props.radioConfig;

    return (
      <div className="radioList">
        {radioConfig.map((element, index) => {
          return (
            <Radio
              key={`${index}${name}`}
              id={index}
              name={name}
              value={element.label}
              checked={index == value}
              onChange={this.onChangeHandle}
            />
          );
        })}
      </div>
    );
  }
}
