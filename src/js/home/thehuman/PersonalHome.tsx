import React from "react";
import { GiantButton } from "../../components/Buttons";
import { Title } from "../../components/Titles";

const PersonalHome = () =>
            <div className="personal-home">
                <div className="personal-home-hero">
                    <Title text="Cole Macdonald" />
                    <p className="subtitle">Human Being</p>
                    <p>Thanks for coming you might be the first person here...</p>
                </div>
                <div className="personal-home-nav-buttons">
                    <GiantButton text="Music" href="#/thehuman/music"/>
                    <GiantButton text="Photography" href="#/thehuman/photography"/>
                    {/* <GiantButton text="Reading" href="#/thehuman/reading"/> */}
                    {/* <GiantButton text="Travels" href="#/thehuman/travels"/> */}
                    {/* <GiantButton text="Sports" href="#/thehuman/sports"/> */}
                    <GiantButton text="Game Development" href="#/thehuman/wizethegame"/>
                </div>
            </div>;

export { PersonalHome };
