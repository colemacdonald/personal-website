import React from "react";

const Home = () => 
    <div className="home tab-content">
        <div>
            <p className="subtitle">Welcome! My name is Cole Macdonald; professionally, I am a Software Engineer, personally, I enjoy music, video games, rock climbing, and practicing my Rubik's cube speed solving.</p>
        </div>
        <div className="horizontal-flex-box centered">
            <a className="giant-button" href="#/thehuman">
                <p>THE HUMAN</p>
            </a>
            <a className="giant-button" href="#/theengineer">
                <p>THE ENGINEER</p>
            </a>
        </div>
    </div>;

export { Home };
