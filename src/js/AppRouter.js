import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //   useRouteMatch,
} from "react-router-dom";
import MainNavBar from "./MainNavBar.js";
import Wize from "./wize/js/components/Wize";
import Home from "./Home.js";

class AppRouter extends Component {
  render() {
    return (
      <div className="app">
        <MainNavBar />
        {/* <Router>
          <Switch>
            <Route path={`/wize`} component={Wize} />
            <Route path="/" component={Home} />
          </Switch>
        </Router> */}
      </div>
    );
  }
}

export default AppRouter;
