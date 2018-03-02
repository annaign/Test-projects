import React from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";
import priorities from "../constants";

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditable: false,
      newText: this.props.todo.text,
      newId: this.props.todo.id,
      newPriority: this.props.todo.priority
    };
  }

  onChangeTodoHandler = () => {
    const onChangeTodo = this.props.onChangeTodo;
    const index = this.props.index;
    const todo = {
      text: this.state.newText,
      id: this.state.newId,
      priority: this.state.newPriority
    };
    onChangeTodo(todo, index);
  };

  onCancelHandler = () => {
    this.setState({
      isEditable: false,
      newText: this.props.todo.text,
      newPriority: this.props.todo.priority
    });
  };

  renderView() {
    const todo = this.props.todo;
    return (
      <div className="todoListBlock">
        <strong>{todo.priority}</strong>
        <span>{todo.text}</span>
        <Button onClick={() => this.setState({ isEditable: true })}>
          Изменить
        </Button>
        <Button>Удалить</Button>
      </div>
    );
  }

  renderEdit() {
    const text = this.state.newText;
    const priority = this.state.newPriority;
    return (
      <div className="todoListBlock">
        <SelectBox
          value={priority}
          options={priorities}
          onChange={value => this.setState({ newPriority: value })}
        />
        <TextBox
          value={text}
          onChange={value => this.setState({ newText: value })}
        />
        <Button onClick={this.onChangeTodoHandler}>Сохранить</Button>
        <Button onClick={this.onCancelHandler}>Отмена</Button>
      </div>
    );
  }

  render() {
    const isEditable = this.state.isEditable;
    return isEditable ? this.renderEdit() : this.renderView();
  }
}
