import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseApp from "./firebase.js";
import TodoList from "./TodoList.js";
import mainLogo from "./img/today-logo.svg";

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    if (user) {
      return (
        <div className="App">
          {/*<p className="hello-text">Hello {user.displayName}</p>*/}
          <TodoList userId={user.uid} />
          <button className="btn-primary" onClick={signOut}>
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="intro">
            <div className="logo-container">
              <img src={mainLogo} className="logo-img" alt="logo" />
            </div>
            <div className="description">
              <p>Organize your day with today, a simple todo list</p>
              <p>
                This is a web app that stays in sync witth your account so you
                can access your todos from anywhere
              </p>
            </div>
          </div>
          <p className="sign-text">Sign in to use</p>
          <button className="btn-primary sign-in" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      );
    }
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
