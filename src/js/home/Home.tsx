import React from "react";
import { GiantButton } from "../components/Buttons";
import { Title } from "../components/Titles";

const Home = () => 
    <div className="page vertical-flex-box home">
        <div className="vertical-flex-box centered">
            <Title text="Welcome!"/>
            <img className="home-image" src={require("../../resources/home/cole2.jpeg")} />

            <p className="subtitle">Click below to learn more about Cole Macdonald.</p>
        </div>
        <div className={`horizontal-flex-box centered nav-buttons ${(window.innerWidth < 600 ? "  wrap small" : "")}`}>
            <GiantButton text="THE HUMAN" href="#/thehuman" />
            <GiantButton text="THE ENGINEER" href="#/theengineer"/>    
        </div>
    </div>;

export { Home };
