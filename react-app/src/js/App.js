import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import "../css/App.css";
import "../css/style.css";
import MainNavBar from "./MainNavBar.js";
import WizeGameComponent from "./wize/js/components/WizeGameComponent";
import Home from "./Home.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Cole Macdonald</h1>
        <MainNavBar />
        {/* <React.Fragment>
          <Router>
            <MainNavBar />
            <Switch>
              <Route path={`/wize`} component={WizeGameComponent} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </React.Fragment> */}
      </div>
    );
  }
}

export default App;
