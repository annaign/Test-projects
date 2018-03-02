import React from "react";
import TodoAppHeader from "./TodoAppHeader";
import TodoList from "./TodoList";

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoArr: []
    };
  }

  pushNewTodo = newTodo => {
    const todoArr = this.state.todoArr;
    this.setState({
      todoArr: [...todoArr, newTodo]
    });
  };

  onChangeTodo = (todo, index) => {
    const newArr = this.state.todoArr.slice();
    newArr[index] = todo;
    this.setState({ todoArr: newArr });
  };

  render() {
    const todoArr = this.state.todoArr;
    return (
      <div>
        <TodoAppHeader pushNewTodo={this.pushNewTodo} />
        <TodoList onChangeTodo={this.onChangeTodo} todoArr={todoArr} />
      </div>
    );
  }
}
