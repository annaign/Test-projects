import React from 'react';
import Radio from '../components/Radio';
import priorities from '../constants';

export default class TodoRadioList extends React.Component {
  state = {
    checked: this.props.value,
  };

  onChangeHandle = e => {
    const checked = e.target.id;
    const onChangePriority = this.props.onChangePriority;

    this.setState({ checked });

    onChangePriority(checked);
  };

  render() {
    const { name, value } = this.props;

    return (
      <div className="radioList">
        <Radio
          key={`${name}`}
          id={0}
          name={name}
          value={'All'}
          checked={this.state.checked == '0'}
          onChange={this.onChangeHandle}
        />
        {priorities.map((element, index) => {
          return (
            <Radio
              key={`${index}${name}`}
              id={index + 1}
              name={name}
              value={element.label}
              checked={this.state.checked == index + 1}
              onChange={this.onChangeHandle}
            />
          );
        })}
      </div>
    );
  }
}
