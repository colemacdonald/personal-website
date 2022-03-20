import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "../css/App.scss";
import { Home } from "./home/Home";
import { PersonalHome } from "./home/thehuman/PersonalHome";
import { ProfessionalHome } from "./home/theengineer/ProfessionalHome";
import { MainNavBar } from "./MainNavBar";
import { WizeAbout } from "./wize/js/components/WizeAbout";
import WizeHome from "./wize/js/components/WizeHome";
import { Music } from "./home/thehuman/Music";
import { Photography } from "./home/thehuman/Photography";
import { WizePanel } from "./home/thehuman/WizePanel";

class App extends Component {
    render() {
        return (
            <HashRouter basename="/">
                <div className="background"/>
                <div className="app">
                    <MainNavBar />
                    <Routes>
                        <Route path="/" element={<Home/>}/> 
                        <Route path="/thehuman" element={<PersonalHome/>}/>
                        <Route path="/thehuman/music" element={<Music/>} />
                        <Route path="/thehuman/photography" element={<Photography/>} />
                        <Route path="/thehuman/wizethegame" element={<WizePanel/>} />
                        <Route path="/theengineer" element={<ProfessionalHome/>} />
                        <Route path="/wize" element={<WizeHome/>} />
                        <Route path="/wizeabout" element={<WizeAbout />}/>
                    </Routes>
                </div>
            </HashRouter>
        );
    }
}

export default App;
