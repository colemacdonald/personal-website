import React, { Component } from "react";
import MainNavBar from "./MainNavBar";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { WizeGameComponent } from "./wize/js/components/WizeGameComponent";
import WizeHome from "./wize/js/components/WizeHome";
import App from "./App";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/> 
                    <Route path="/wize" element={<WizeHome/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
