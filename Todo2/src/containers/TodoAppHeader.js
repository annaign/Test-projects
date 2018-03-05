import React from 'react';
import Button from '../components/Button';
import SelectBox from '../components/SelectBox';
import priorities from '../constants';

export default class TodoAppHeader extends React.Component {
  state = {
    id: null,
    priority: priorities[priorities.length - 1].value,
    durationHours: 0,
    text: '',
  };

  onSubmit = event => {
    event.preventDefault();
  };

  onChangeSelect = value => {
    this.setState({ priority: value });
  };

  onChangeHandler = event => {
    const target = event.target;

    switch (target.name) {
      case 'newDurationHours':
        this.setState({ durationHours: target.value });
        break;
      case 'newText':
        this.setState({ text: target.value });
        break;
    }
  };

  addNewTodo = () => {
    if (this.state.text) {
      const newTodo = {
        id: Date.now(),
        priority: this.state.priority,
        durationHours: this.state.durationHours,
        text: this.state.text,
      };

      this.setState(
        {
          id: null,
          priority: priorities[priorities.length - 1].value,
          durationHours: 0,
          text: '',
        },
        () => this.props.pushNewTodo(newTodo),
      );
    }
  };

  render() {
    const newPriority = this.state.priority;
    const newDurationHours = this.state.durationHours;
    const newText = this.state.text;

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>New objective:</legend>
          <div className="todoFormBlock1">
            <div className="center">Priority</div>
            <SelectBox
              options={priorities}
              value={newPriority}
              onChange={this.onChangeSelect}
            />
          </div>
          <div className="todoFormBlock2">
            <div className="center">Objective time in hours</div>
            <input
              type="number"
              min="0"
              max="100000"
              name={'newDurationHours'}
              value={newDurationHours}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="todoFormBlock3">
            <div className="center">Objective text</div>
            <input
              type="text"
              size="40"
              name={'newText'}
              value={newText}
              onChange={this.onChangeHandler}
            />
            <Button onClick={this.addNewTodo}>Add</Button>
          </div>
          <div className="clearfix" />
        </fieldset>
      </form>
    );
  }
}
