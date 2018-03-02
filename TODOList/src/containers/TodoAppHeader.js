import React from "react";
import TextBox from "../components/TextBox";
import Button from "../components/Button";
import SelectBox from "../components/SelectBox";
import priorities from "../constants";

export default class TodoAppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: undefined,
      id: undefined,
      priority: 0
    };
  }

  addNewTodo = () => {
    if (this.state.text) {
      const newTodo = {
        text: this.state.text,
        id: Date.now(),
        priority: this.state.priority
      };

      this.setState(
        {
          text: undefined,
          priority: 0
        },
        () => this.props.pushNewTodo(newTodo)
      );
    }
  };

  render() {
    const newText = this.state.text;
    const newPriority = this.state.priority;
    return (
      <div>
        <SelectBox
          options={priorities}
          value={newPriority}
          onChange={value => this.setState({ priority: value })}
        />
        <TextBox
          value={newText}
          onChange={value => this.setState({ text: value })}
        />
        <Button onClick={this.addNewTodo}>Add</Button>
      </div>
    );
  }
}
