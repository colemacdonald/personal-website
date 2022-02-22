import React, { Component } from "react";
import { WizeGameComponent } from "./WizeGameComponent";
import "../../../../css/wize.css";
import { GameControllerBase } from "../game/controllers/GameControllerBase";

class WizeHome extends Component {
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
        canvasScale: 2,
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
        let controls = [];

        this.controls.forEach((cntrl, i) => {
            controls.push(<li key={i}>{cntrl}</li>);
        });

        let changes = [];
        this.changes.forEach((change, i) => {
            changes.push(<li key={i}>{change}</li>);
        });

        return (
            <div className="tab-content">
                <p className="game-title">The Adventures of Yeezy the Wize</p>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex-item">
                                    <div className="vertical-flex">
                                        <div className="flex-item">
                                            <p style={{ fontWeight: "bold", color: "greenyellow" }}>
                                                Current HighScore: {this.currentRecord}*
                                            </p>
                                            <p style={{ color: "grey" }}>*(Previous Version)</p>
                                        </div>
                                        <div className="flex-item">{this.description}</div>
                                        <div className="flex-item">{this.scoring}</div>
                                        <div className="flex-item" style={{ fontWeight: "bold" }}>
                                            Recent Changes:
                                            {changes}
                                        </div>
                                        <div className="flex-item">
                                            Controls:
                                            {controls}
                                        </div>
                                        <div className="flex-item">{this.background}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <WizeGameComponent {...this.gameProperties} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default WizeHome;
