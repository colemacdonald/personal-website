import React, { Component } from "react";
import "../css/App.css";
import AppRouter from "./AppRouter";
import MainNavBar from "./MainNavBar";

class App extends Component {
    render() {
        return (
            <div className="app">
                <MainNavBar />
                <AppRouter />
            </div>
        );
    }
}

export default App;
