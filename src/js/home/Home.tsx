import React from "react";
import { GiantButton } from "../components/Buttons";
import { Title } from "../components/Titles";

export const Home = () => 
    <div className="home">
        <div className="home-hero-section">
            <Title text="Welcome!"/>
            <img className="home-image" src={require("../../resources/home/cole2.jpeg")} />

            <p className="subtitle">Click below to learn more about Cole Macdonald.</p>
        </div>
        <div className="home-button-container">
            <GiantButton text="THE HUMAN" href="#/thehuman" />
            <GiantButton text="THE ENGINEER" href="#/theengineer"/>    
        </div>
    </div>;
