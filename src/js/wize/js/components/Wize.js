import React, { Component } from "react";
import WizeGameComponent from "./WizeGameComponent.js";
import "../../../../css/wize.css";

class Wize extends Component {
  gameDimensions = {
    viewportH: 500,
    viewportW: 1000,
    viewportY: 0,
    viewportX: 0,
  };

  description = `Play as Yeezy the Wize as he tries to collect all of the K-Coins.
  Be careful not to touch the monsters.`;

  scoring = `After collecting all 20 coins, the game will reset and 'Games' will increment.`;

  controls = [
    `← and → to Move`,
    `↑ to Jump`,
    `↓ to Drop`,
    `Double jumps supported!`,
  ];

  background = `This game was developed by Tom Gavelin and I in 2017. The physics and frames are all custom built. All pixel art was done by Tom.`;

  render() {
    let controls = [];

    this.controls.forEach((cntrl) => {
      controls.push(<li>{cntrl}</li>);
    });

    return (
      <div>
        <p className="game-title">The Adventures of Yeezy the Wize</p>
        <table>
          <tr>
            <td>
              <div className="flex-item">
                <div className="vertical-flex">
                  <div className="flex-item">{this.description}</div>
                  <div className="flex-item">{this.scoring}</div>

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
        </table>
      </div>
    );
  }
}

export default Wize;
