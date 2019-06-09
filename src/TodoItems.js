import React, { Component } from "react";
import FlipMove from "react-flip-move";
// import firebaseApp from "./firebase.js";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }
  createTasks(item) {
    if (item.completed) {
      return (
        <li key={item.todoKey}>
          <div className="checkbox">
            <input
              type="checkbox"
              id={item.todoKey * 2}
              onChange={() => this.checked(item)}
              defaultChecked={true}
            />
            <label htmlFor={item.todoKey * 2} className="check-box" />
          </div>
          <p style={{ opacity: "0.3", textDecoration: "line-through" }}>
            {item.todoText}
          </p>
          <button
            onClick={() => this.delete(item.todoKey)}
            className="deleteBtn"
          >
            x
          </button>
        </li>
      );
    } else {
      return (
        <li key={item.todoKey}>
          <div className="checkbox">
            <input
              type="checkbox"
              id={item.todoKey * 2}
              onChange={() => this.checked(item)}
              defaultChecked={false}
            />
            <label htmlFor={item.todoKey * 2} className="check-box" />
          </div>

          <p>{item.todoText}</p>
          <button
            onClick={() => this.delete(item.todoKey)}
            className="deleteBtn"
          >
            x
          </button>
        </li>
      );
    }
  }
  delete(key) {
    this.props.delete(key);
  }

  checked(item) {
    this.props.checked(item);
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="list">
        <FlipMove duration={400} easing="ease">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
}

export default TodoItems;
