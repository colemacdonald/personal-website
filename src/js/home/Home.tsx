import React from "react";

const Home = () => 
    <div className="tab-content vertical-flex-box home">
        <div className="vertical-flex-box centered">
            <p className="subtitle">Welcome! My name is Cole Macdonald.</p>
            <p>Professionally, I am a Software Engineer, personally, I enjoy music, video games, rock climbing, and practicing my Rubik's cube speed solving.</p>
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
