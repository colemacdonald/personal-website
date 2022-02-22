import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "../css/App.css";
import AppRouter from "./AppRouter";
import Home from "./Home";
import MainNavBar from "./MainNavBar";
import WizeHome from "./wize/js/components/WizeHome";

class App extends Component {
    render() {
        return (
            <HashRouter basename="/">
                <div className="app">
                    <MainNavBar />
                    <Routes>
                        <Route path="/" element={<Home/>}/> 
                        <Route path="/wize" element={<WizeHome/>} />
                    </Routes>
                </div>
            </HashRouter>
        );
    }
}

export default App;
