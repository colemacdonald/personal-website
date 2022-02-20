import React, { Component } from "react";
import "../css/App.css";
import AppRouter from "./AppRouter";

class App extends Component {
    render() {
        return (
            <div className="app">
                <AppRouter />
            </div>
        );
    }
}

export default App;
