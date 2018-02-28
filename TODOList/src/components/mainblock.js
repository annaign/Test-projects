import React from "react";
import ReactDOM from "react-dom";

var todoArr = [];
var uniqueKey = 0;

class MainBlock extends React.Component {
  AddTodoText() {
    var newTodo = document.getElementById("todoText");
    if (newTodo.value !== "") {
      todoArr.push([newTodo.value, "todo" + uniqueKey]);
      newTodo.value = "";
      uniqueKey++;

      addNewTodoBlock();
    }
  }

  render() {
    return (
      <div>
        <input type="text" id="todoText" autoFocus={true} />
        <button id="btnDel" onClick={this.AddTodoText}>
          Add
        </button>
      </div>
    );
  }
}

function addNewTodoBlock() {
  const todoList = todoArr.map(function(currentValue, index) {
    return (
      <div key={currentValue[1]} id={currentValue[1]} className="todoListBlock">
        <p style={{ display: "inline-block" }}>{currentValue[0]}</p>
        <button onClick={DeleteTodoBlock.bind(this, currentValue[1])}>
          Delete
        </button>
      </div>
    );
  });

  ReactDOM.render(todoList, document.getElementById("todoList"));
}

function DeleteTodoBlock(props) {
  let btn = document
    .getElementById(props)
    .parentNode.removeChild(document.getElementById(props));
}

export default MainBlock;
