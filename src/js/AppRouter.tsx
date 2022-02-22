import React, { Component } from "react";
import MainNavBar from "./MainNavBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { WizeGameComponent } from "./wize/js/components/WizeGameComponent";
import WizeHome from "./wize/js/components/WizeHome";

class AppRouter extends Component {
    render() {
        return (
            <div >
                <React.Fragment>
                    <Router>
                        <MainNavBar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/wize" component={WizeHome} />
                        </Switch>
                    </Router>
                </React.Fragment>
            </div>
        );
    }
}

export default AppRouter;
