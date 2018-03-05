import React from 'react';
import TodoRadioList from './TodoRadioList';
import TodoListItem from './TodoListItem';
import priorities from '../constants';

export default class TodoList extends React.Component {
  state = {
    searchingText: '',
    searchingPriority: 0,
  };

  onChangeSearch = e => {
    const target = e.target;
    this.setState({ searchingText: target.value });
  };

  onChangePriority = checked => {
    this.setState({ searchingPriority: checked });
  };

  onSearchingPriority = checked => {
    const arr = this.props.todoArr;
    return +checked ? arr.filter(todo => todo.priority == checked) : arr;
  };

  onSearchingText = (searchingText, arr) => {
    return searchingText
      ? arr.filter(todo => todo.text.indexOf(searchingText) !== -1)
      : arr;
  };

  render() {
    const searchingPriority = this.state.searchingPriority;
    const filteredArr = this.onSearchingPriority(searchingPriority);

    const searchingText = this.state.searchingText;
    const filteredTodoArr = this.onSearchingText(searchingText, filteredArr);

    const onChangeTodo = this.props.onChangeTodo;
    const onDeleteTodo = this.props.onDeleteTodo;

    return (
      <div className="todoList">
        <span>Search text: </span>
        <input
          type="search"
          size="40"
          value={searchingText}
          onChange={this.onChangeSearch}
        />
        <TodoRadioList
          value={this.state.searchingPriority}
          name={'priority'}
          radioConfig={[{ label: 'All', value: 0 }].concat(priorities)}          
          onChangePriority={this.onChangePriority}
        />
        <h2 className="center">TODO List</h2>
        {filteredTodoArr.map(todo => {
          return (
            <TodoListItem
              key={`${todo.id}`}
              todo={todo}
              onChangeTodo={onChangeTodo}
              onDeleteTodo={onDeleteTodo}
            />
          );
        })}
      </div>
    );
  }
}
