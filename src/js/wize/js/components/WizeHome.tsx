import React, { Component } from "react";
import { WizeGameComponent } from "./WizeGameComponent";
import "../../../../css/wize.scss";
import { GameControllerBase } from "../game/controllers/GameControllerBase";
import { ContentPage } from "../../../components/ContentPage";

export class WizeHome extends Component {
    gameController: GameControllerBase;

    constructor(props) {
        super(props);
    }

    // TODO: these aren't game dimensions, they are viewport dimensions
    gameProperties = {
        viewportH: 500,
        viewportW: 1000,
        viewportY: 0,
        viewportX: 0,
        canvasScale: 1,
    };

    description = `Play as Yeezy the Wize as he tries to collect all of the K-Coins.
  Be careful not to touch the monsters.`;

    currentRecord = `Kyell: 7-1000`;

    scoring = `In Survival mode, play through random levels collecting coins. After collecting all 20 coins you will advance to the next level. In Story mode, progress through the pre-made levels.`;

    controls = [
        `← and → to Move`,
        `↑ to Jump`,
        `↓ to Drop`,
        `Double jumps supported!`,
        `Super-secret dance move: hold one direction and tap the other...`,
    ];

    changes = [
        
    ];

    background = `This game was developed by my friend and I in 2018. The physics are all custom, and frames are drawn on an html canvas (yes, really).`;

    render() {
        return (
            <ContentPage classes="wize-game-root">
                <p className="game-title">The Adventures of Yeezy the Wize</p>
                <WizeGameComponent {...this.gameProperties} />
            </ContentPage>
        );
    }
}
