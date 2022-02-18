import React, { Component } from "react";
import WizeGameComponent from "./WizeGameComponent.js";
import "../../../../css/wize.css";

class WizeHome extends Component {
  // TODO: these aren't game dimensions, they are viewport dimensions
  gameDimensions = {
    viewportH: 500,
    viewportW: 1000,
    viewportY: 0,
    viewportX: 0,
  };

  description = `Play as Yeezy the Wize as he tries to collect all of the K-Coins.
  Be careful not to touch the monsters.`;

  currentRecord = `Kyell: 7-1000`;

  scoring = `After collecting all 20 coins you will advance to the next level.`;

  controls = [
    `← and → to Move`,
    `↑ to Jump`,
    `↓ to Drop`,
    `Double jumps supported!`,
    `Super-secret dance move: hold one direction and tap the other...`,
  ];

  changes = [
    `Number of monsters and monster speed now scale with level!`,
    `Coins won't spawn as close to the edge of the map.`,
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
      <div>
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
                <WizeGameComponent
                  className="flex-item"
                  dimensions={this.gameDimensions}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default WizeHome;
