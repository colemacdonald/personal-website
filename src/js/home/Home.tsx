import React from "react";

const Home = () => 
    <div className="vertical-flex-box home">
        <div className="vertical-flex-box centered">
            <p className="title">Welcome!</p>
            <p className="subtitle">Click below to find out more about Cole Macdonald.</p>
        </div>
        <div className="horizontal-flex-box centered nav-buttons">
            <a className="giant-button" href="#/thehuman">
                <p>THE HUMAN</p>
            </a>
            <a className="giant-button" href="#/theengineer">
                <p>THE ENGINEER</p>
            </a>
        </div>
    </div>;

export { Home };
