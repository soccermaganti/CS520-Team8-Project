import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Home from "/health_management_frontend/app/page.tsx";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Home />;
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv); // createRoot(container!) if you use TypeScript
root.render(<App />);
