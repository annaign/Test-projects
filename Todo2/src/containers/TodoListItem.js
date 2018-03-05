import React from 'react';
import Button from '../components/Button';
import SelectBox from '../components/SelectBox';
import priorities from '../constants';

export default class TodoListItem extends React.Component {
  state = {
    isEditable: false,
    newId: this.props.todo.id,
    newPriority: this.props.todo.priority,
    newDurationHours: this.props.todo.durationHours,
    newText: this.props.todo.text,
  };

  onChangeTodoValue = e => {
    const target = e.target;

    switch (target.name) {
      case 'newDurationHours':
        this.setState({ newDurationHours: target.value, newId: Date.now() });
        break;
      case 'newText':
        this.setState({ newText: target.value, newId: Date.now() });
        break;
    }
  };

  onChangePriority = value => {
    this.setState({ newPriority: value, newId: Date.now() });
  };

  onClickBtnSaveHandler = () => {
    const onChangeTodo = this.props.onChangeTodo;
    const index = this.props.todo.index;
    const todo = {
      index: this.props.todo.index,
      id: this.state.newId,
      priority: this.state.newPriority,
      durationHours: this.state.newDurationHours,
      text: this.state.newText,
    };
    onChangeTodo(todo, index);
  };

  onClickBtnCancelHandler = () => {
    this.setState({
      isEditable: false,
      newId: this.props.todo.id,
      newPriority: this.props.todo.priority,
      newDurationHours: this.state.durationHours,
      newText: this.props.todo.text,
    });
  };

  onClickBtnDeleteHandler = () => {
    const onDeleteTodo = this.props.onDeleteTodo;
    const index = this.props.todo.index;

    onDeleteTodo(index);
  };

  onClickBtnChangeHandler = () => {
    this.setState({ isEditable: true });
  };

  renderView() {
    const todo = this.props.todo;
    const priorityIndex = priorities.findIndex(element => {
      if (element.value == todo.priority) {
        return true;
      }
    });

    return (
      <div className="todoListBlock">
        <div className="todoFormBlock1">
          <strong>{priorities[priorityIndex].label}</strong>
        </div>
        <div className="todoFormBlock2">
          <span>{todo.durationHours}</span>
        </div>
        <div className="todoFormBlock3">
          <div className="todoText">{todo.text}</div>
          <Button onClick={this.onClickBtnChangeHandler}>Change</Button>
          <Button onClick={this.onClickBtnDeleteHandler}>Delete</Button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }

  renderEdit() {
    const priority = this.state.newPriority;
    const durationHours = this.state.newDurationHours;
    const text = this.state.newText;

    return (
      <div className="todoListBlock">
        <div className="todoFormBlock1">
          <div className="center">Priority</div>
          <SelectBox
            value={priority}
            name={'newPriority'}
            options={priorities}
            onChange={value => this.onChangePriority(value)}
          />
        </div>
        <div className="todoFormBlock2">
          <div className="center">Objective time in hours</div>
          <input
            type="number"
            min="0"
            max="100000"
            name={'newDurationHours'}
            value={durationHours}
            onChange={this.onChangeTodoValue}
          />
        </div>
        <div className="todoFormBlock3">
          <div className="center">Objective text</div>
          <input
            type="text"
            size="40"
            name={'newText'}
            value={text}
            onChange={this.onChangeTodoValue}
          />
          <Button onClick={this.onClickBtnSaveHandler}>Save</Button>
          <Button onClick={this.onClickBtnCancelHandler}>Cancel</Button>
        </div>
        <div className="clearfix" />
      </div>
    );
  }

  render() {
    const isEditable = this.state.isEditable;
    return isEditable ? this.renderEdit() : this.renderView();
  }
}
