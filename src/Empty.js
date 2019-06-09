import React, { Component } from "react";
import meditationGirl from "./img/meditationGirl.svg";

class Empty extends Component {
  render() {
    return (
      <div>
        <img
          src={meditationGirl}
          alt="Relaxed Girl"
          className="meditation-girl"
        />
        <div className="chill-text">
          <p>Time to chill...</p>
          <p>Have something to do? Add it above</p>
        </div>
      </div>
    );
  }
}

export default Empty;
