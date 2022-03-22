import React from "react";
import { ContentPage } from "../../components/ContentPage";
import { Heading1, Title } from "../../components/Titles";

let controls = [
    `← and → to Move`,
    `↑ to Jump`,
    `↓ to Drop through thin platforms`,
];

const WizePanel = () => 
    <ContentPage classes="wize-info">
        <div className="content">
            <Title text="Yeezy the Wize" />

            <p>This game was originally developed by my friend and I in 2018. The physics are all custom, and frames are drawn on an html canvas (yes, really). 2022 saw a large graphics revamp and the introduction of story mode.</p>

            <div className="primary-button vertical-flex-box">
                <a className="vertical-flex-box centered" href="#/wize"><p>Play Now!</p></a>
            </div>
            <div>
                <Heading1 text="Controls" />
                <ul>
                    {controls.map(c => <li>{c}</li>)}
                </ul>
            </div>
            
            <div className="vertical-flex-box">
                <Heading1 text="Game Modes" />
                <p>In Survival mode, play through random levels collecting coins. After collecting all 20 coins you will advance to the next level.</p>
                <img src={require("../../../resources/home/wize-survival.png")} />
                <p>In Story mode, progress through the pre-made levels collecting powerups along the way.</p>
                <img src={require("../../../resources/home/wize-story1.png")} />
                <img className="" src={require("../../../resources/home/wize-story2.png")} />
            </div>
            
            <p>While your here, try your hand at a highscore or your best time!</p>
        </div>
        <div></div>
    </ContentPage>;

export { WizePanel };