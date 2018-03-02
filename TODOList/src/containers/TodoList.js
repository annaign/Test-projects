import React from "react";
import TextBox from "../components/TextBox";
import TodoListItem from "./TodoListItem";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: undefined
    };
  }

  render() {
    const search = this.state.search;
    const filteredTodoArr = search
      ? this.props.todoArr.filter(todo => todo.text.indexOf(search) != -1)
      : this.props.todoArr;
    const onChangeTodo = this.props.onChangeTodo;
    return (
      <div>
        <TextBox
          value={this.state.search}
          onChange={value => this.setState({ search: value })}
        />
        {filteredTodoArr.map((todo, index) => {
          return (
            <TodoListItem
              onChangeTodo={onChangeTodo}
              key={`${todo.priority}${todo.text}${index}`}
              todo={todo}
              index={index}
            />
          );
        })}
      </div>
    );
  }
}
