import React, { Component } from "react";
import MainNavBar from "./MainNavBar.js";

class AppRouter extends Component {
  render() {
    return (
      <div className="app">
        <MainNavBar />
      </div>
    );
  }
}

export default AppRouter;
