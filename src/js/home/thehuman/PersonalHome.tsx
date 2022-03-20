import React from "react";
import { GiantButton } from "../../components/Buttons";

const PersonalHome = () =>
            <div className="page personal-home home vertical-flex-box">
                <div className="vertical-flex-box centered">
                    <p className="title">Cole Macdonald</p>
                    <p className="subtitle">Human Being</p>
                </div>
                <div className="vertical-flex-box centered">
                    <p>Thanks for coming you might be the first person here...</p>
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    <GiantButton text="Music" href="#/thehuman/music"/>
                    <GiantButton text="Games" href="#/thehuman/wizethegame"/>
                    <GiantButton text="Reading" href=""/>
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    <GiantButton text="Travels" href=""/>
                    <GiantButton text="Sports" href=""/>
                    <GiantButton text="Photography" href="#/thehuman/photography"/>
                </div>
            </div>;

export { PersonalHome };
