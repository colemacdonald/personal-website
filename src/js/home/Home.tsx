import React from "react";

const Home = () => 
    <div className="vertical-flex-box home">
        <div className="vertical-flex-box centered">
            <p className="title">Welcome!</p>
            <img className="home-image" src={require("../../resources/home/cole2.jpeg")} />

            <p className="subtitle">Click below to learn more about Cole Macdonald.</p>
        </div>
        <div className={"horizontal-flex-box centered nav-buttons" + (window.innerWidth < 600 ? " wrap" : "")}>
            <a className="giant-button" href="#/thehuman">
                <p>THE HUMAN</p>
            </a>
            <a className="giant-button" href="#/theengineer">
                <p>THE ENGINEER</p>
            </a>
        </div>
    </div>;

export { Home };
