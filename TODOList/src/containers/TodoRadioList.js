import React from 'react';
import Radio from '../components/Radio';
import priorities from '../constants';

export default class TodoRadioList extends React.Component {
  state = {
    checked: this.props.value,
    radioConfig: [{ label: 'All', value: 0 }].concat(priorities),
  };

  onChangeHandle = e => {
    const checked = e.target.id;
    const onChangePriority = this.props.onChangePriority;

    this.setState({ checked });
    onChangePriority(checked);
  };

  render() {
    const { name, value } = this.props;
    const radioConfig = this.state.radioConfig;

    return (
      <div className="radioList">
        {radioConfig.map((element, index) => {
          return (
            <Radio
              key={`${index}${name}`}
              id={index}
              name={name}
              value={element.label}
              checked={this.state.checked == index}
              onChange={this.onChangeHandle}
            />
          );
        })}
      </div>
    );
  }
}
