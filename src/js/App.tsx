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
import { Travels } from "./home/thehuman/Travels";
import { Sports } from "./home/thehuman/Sports";
import { Reading } from "./home/thehuman/Reading";
import { Footer } from './home/Footer';

export const App = () => {
    return (
        <HashRouter basename="/">
            <div className="app-container">
                <div className="background" />
                <div className="app-content">
                    <MainNavBar />
                    <div className="app-body">
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/thehuman" element={<PersonalHome/>}/>
                            <Route path="/thehuman/music" element={<Music/>} />
                            <Route path="/thehuman/photography" element={<Photography/>} />
                            <Route path="/thehuman/wizethegame" element={<WizePanel/>} />
                            <Route path="/thehuman/travels" element={<Travels/>} />
                            <Route path="/thehuman/reading" element={<Reading/>} />
                            <Route path="/thehuman/sports" element={<Sports/>} />
                            <Route path="/theengineer" element={<ProfessionalHome/>} />
                            <Route path="/wize" element={<WizeHome/>} />
                            <Route path="/wizeabout" element={<WizeAbout />}/>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </HashRouter>
    );
}