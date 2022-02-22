import React, { Component } from "react";
import MainNavBar from "./MainNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { WizeGameComponent } from "./wize/js/components/WizeGameComponent";
import WizeHome from "./wize/js/components/WizeHome";
import App from "./App";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/personal-website" element={<Home/>}/> 
                    <Route path="/personal-website/wize" element={<WizeHome/>} />
                </Routes>
                {/* <MainNavBar /> */}
                {/* <Route exact path="/" component={Home} /> */}
                {/* <Route path="wize" component={WizeHome} /> */}
                
            </BrowserRouter>
        );
    }
}

export default AppRouter;
