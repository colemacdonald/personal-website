import { util } from "../util.js";
import { ControllableCharacter } from "./sprites/ControllableCharacter";
import { Room } from "./Room";
import { Powerup } from "./Powerup.js";

class WizeGame {
  grav: number;
  room: Room;
  character: ControllableCharacter;
  onGround: boolean;

  gameOptions: GameOptions;

  playerAlive: boolean;
  score: number;

  lastPowerup: Powerup;

  /**
   * Create a new game
   */
  constructor(options: GameOptions, room: Room, character: ControllableCharacter) {
    this.gameOptions = options;
    this.grav = options.grav;
    this.room = room;
    this.character = character;

    this.playerAlive = true;
    this.score = 0;
  }

  /**
   * Update the game state to the next frame
   */
  update() {
    // If the character on a platform?
    this.onGround = false;
    this.character.onG = false;

    this.room.platforms.forEach((plat) => {
      if (
        util.doRectanglesOverlap(
          this.character.x,
          this.character.y + this.character.h * 0.97,
          this.character.h * 0.1,
          this.character.w,
          plat.x,
          plat.y,
          plat.h * 0.4, // platforms are mostly dirt
          plat.w
        ) &&
        !this.character.onG &&
        this.character.yv > 0
      ) {
        this.character.setCurrentPlatform(plat);
        this.onGround = true;
      }
    }, this);

    // Move
    this.character.move();

    // Force in bounds
    this.character.setPosition(Math.max(Math.min(this.room.w - this.character.w, this.character.x), 0), Math.max(Math.min(this.room.h - this.character.h + 30, this.character.y), 0));

    this.room.monsters.forEach(monster => {
      if (
        util.doRectangleArraysOverlap(this.character.getHurtBoxes(), [
          { x: monster.x, y: monster.y, h: monster.h, w: monster.w },
        ])
      ) {
        this.playerAlive = false;
      }
      monster.move();
    }, this);

    var indices = [];

    this.room.coins.forEach(coin => {
      if (
        util.doRectangleArraysOverlap(this.character.getHurtBoxes(), [
          {
            x: coin.x - coin.r,
            y: coin.y - coin.r,
            h: coin.r * 2,
            w: coin.r * 2,
          },
        ])
      ) {
        indices.push(this.room.coins.indexOf(coin));
      }
    }, this);

    // Remove coins from game
    for (var i = indices.length - 1; i >= 0; i--) {
      this.score += 100;
      this.room.coins.splice(indices[i], 1);
    }

    // check for powerups
    let powerup = this.getOverlappingPowerup();
    if (powerup) {
      powerup.method(this.character);
      this.room.powerups.splice(this.room.powerups.indexOf(powerup), 1);
      this.lastPowerup = powerup;
    }
  }

  getOverlappingPowerup() : Powerup {
    let powerup = null;

    this.room.powerups.forEach(p => {
        if (util.doRectangleArraysOverlap([{x: p.coin.x - p.coin.r / 2, y: p.coin.y - p.coin.r/2, h: p.coin.r*2, w: p.coin.r*2}], this.character.getHurtBoxes())) {
            powerup = p;
        }
    });

    return powerup;
}


  /***************** EVENTS *******************/

  leftPress() {
    this.character.leftPress();
  }

  leftRelease() {
    this.character.leftRelease();
  }

  rightPress() {
    this.character.rightPress();
  }

  rightRelease() {
    this.character.rightRelease();
  }

  upPress() {
    this.character.upPress();
  }

  upRelease() {
    this.character.upRelease();
  }

  downPress() {
    this.character.downPress();
  }

  downRelease() {
    this.character.downRelease();
  }
}

export default WizeGame;

export { WizeGame };
