import React from "react";
import { GiantButton } from "../../components/Buttons";
import { Title } from "../../components/Titles";

const PersonalHome = () =>
            <div className="page personal-home home vertical-flex-box">
                <div className="vertical-flex-box centered">
                    <Title text="Cole Macdonald" />
                    <p className="subtitle">Human Being</p>
                </div>
                <div className="vertical-flex-box centered">
                    <p>Thanks for coming you might be the first person here...</p>
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    <GiantButton text="Music" href="#/thehuman/music"/>
                    <GiantButton text="Photography" href="#/thehuman/photography"/>
                    {/* <GiantButton text="Reading" href="#/thehuman/reading"/> */}
                </div>
                <div className="horizontal-flex-box centered nav-buttons">
                    {/* <GiantButton text="Travels" href="#/thehuman/travels"/> */}
                    {/* <GiantButton text="Sports" href="#/thehuman/sports"/> */}
                    <GiantButton text="Game Development" href="#/thehuman/wizethegame"/>
                    
                </div>
            </div>;

export { PersonalHome };
