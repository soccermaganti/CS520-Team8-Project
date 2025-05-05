import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Health Management System</h1>
        <p>This is the home page.</p>
      </div>
    );
  }
}
