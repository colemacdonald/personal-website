import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "../css/App.css";
import Home from "./Home";
import MainNavBar from "./MainNavBar";
import { WizeAbout } from "./wize/js/components/WizeAbout";
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
                        <Route path="/wizeabout" element={<WizeAbout />}/>
                    </Routes>
                </div>
            </HashRouter>
        );
    }
}

export default App;
