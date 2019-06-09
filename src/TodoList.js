import React, { Component } from "react";
import TodoItems from "./TodoItems";
import Empty from "./Empty";
import "./TodoList.css";
import firebaseApp from "./firebase.js";
import mainLogo from "./img/today-logo.svg";

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let dateNumber = date.getDate();
let day = date.getDay();

switch (day) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "error";
    break;
}

switch (month) {
  case 0:
    month = "Jan";
    break;
  case 1:
    month = "Feb";
    break;
  case 2:
    month = "Mar";
    break;
  case 3:
    month = "Apr";
    break;
  case 4:
    month = "May";
    break;
  case 5:
    month = "Jun";
    break;
  case 6:
    month = "Jul";
    break;
  case 7:
    month = "Aug";
    break;
  case 8:
    month = "Sep";
    break;
  case 9:
    month = "Oct";
    break;
  case 10:
    month = "Nov";
    break;
  case 11:
    month = "Dec";
    break;
  default:
    day = "error";
    break;
}

class TodoList extends Component {
  constructor(props) {
    super(props);

    let fbItems = [];
    let newItems = [];
    let that = this;
    firebaseApp
      .firestore()
      .collection("todos")
      .where("userId", "==", that.props.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          fbItems.push(doc.id);
        });
        for (let i = 0; i < fbItems.length; i++) {
          firebaseApp
            .firestore()
            .collection("todos")
            .doc(fbItems[i])
            .get()
            .then(function(doc) {
              fbItems[i] = doc.data();
              newItems.push(doc.data());
              that.setState({ items: newItems });
            });
        }
      });

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkedItem = this.checkedItem.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value) {
      e.preventDefault();
      let newItem = {
        userId: this.props.userId,
        todoText: this._inputElement.value,
        todoKey: Date.now(),
        completed: false
      };
      firebaseApp
        .firestore()
        .collection("todos")
        .add({
          userId: newItem.userId,
          todoText: newItem.todoText,
          todoKey: newItem.todoKey,
          completed: newItem.completed
        });

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem)
        };
      });
      this._inputElement.value = "";
    }
  }

  deleteItem(key) {
    let filteredItems = this.state.items.filter(item => {
      return item.todoKey !== key;
    });
    firebaseApp
      .firestore()
      .collection("todos")
      .where("todoKey", "==", key)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          firebaseApp
            .firestore()
            .collection("todos")
            .doc(doc.id)
            .delete();
        });
      });
    this.setState({
      items: filteredItems
    });
  }

  checkedItem(checkedItem) {
    let filteredItems = [];

    this.state.items.forEach(item => {
      if (item === checkedItem) {
        checkedItem.completed = !item.completed;
        filteredItems.push(checkedItem);
      } else {
        filteredItems.push(item);
      }
    });

    this.setState({
      items: filteredItems
    });

    firebaseApp
      .firestore()
      .collection("todos")
      .where("todoKey", "==", checkedItem.todoKey)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          firebaseApp
            .firestore()
            .collection("todos")
            .doc(doc.id)
            .set({
              userId: checkedItem.userId,
              todoText: checkedItem.todoText,
              todoKey: checkedItem.todoKey,
              completed: checkedItem.completed
            });
        });
      });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="main-header">
          <div className="logo-container">
            <img src={mainLogo} className="logo-img" alt="logo" />
          </div>
          <div className="date">
            <div className="date-month-year">
              <p className="date-number">{dateNumber}</p>
              <div className="month-year">
                <p className="date-month">{month}</p>
                <p className="date-year">{year}</p>
              </div>
            </div>
            <div className="line" />
            <p className="date-day">{day}</p>
          </div>
        </div>
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              ref={a => (this._inputElement = a)}
              type="text"
              placeholder="What do you have to do?"
            />
            <button type="submit" className="plus-btn">
              +
            </button>
          </form>
        </div>
        {this.state.items.length > 0 ? (
          <TodoItems
            entries={this.state.items}
            delete={this.deleteItem}
            checked={this.checkedItem}
          />
        ) : (
          <Empty />
        )}
      </div>
    );
  }
}

export default TodoList;
