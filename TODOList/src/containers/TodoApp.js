import React from 'react';
import TodoAppHeader from '../containers/TodoAppHeader';
import TodoList from '../containers/TodoList';

export default class TodoApp extends React.Component {
  state = {
    index: 0,
    todoArr: [],
  };

  addNewTodo = newTodo => {
    newTodo.index = this.state.index;
    this.setState(prevState => {
      return {
        index: prevState.index + 1,
        todoArr: [...prevState.todoArr, newTodo],
      };
    });
  };

  onChangeTodo = (todo, index) => {
    const newArr = this.state.todoArr.slice();
    const arrIndex = newArr.findIndex(element => {
      if (element.index === index) {
        return true;
      }
    });

    newArr[arrIndex] = todo;
    this.setState({ todoArr: newArr });
  };

  onDeleteTodo = index => {
    const newArr = this.state.todoArr.slice();
    const arrIndex = newArr.findIndex(element => {
      if (element.index === index) {
        return true;
      }
    });

    newArr.splice(arrIndex, 1);
    this.setState({ todoArr: newArr });
  };

  render() {
    const todoArr = this.state.todoArr;

    return (
      <div>
        <TodoAppHeader addNewTodo={this.addNewTodo} />
        <TodoList
          todoArr={todoArr}
          onChangeTodo={this.onChangeTodo}
          onDeleteTodo={this.onDeleteTodo}
        />
      </div>
    );
  }
}
