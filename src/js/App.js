import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/App.css";
import "../css/style.css";
import MainNavBar from "./MainNavBar.js";
import WizeGameComponent from "./wize/js/components/WizeGameComponent";
import Home from "./Home.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <React.Fragment>
          <Router>
            <MainNavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/wize" component={WizeGameComponent} />
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
