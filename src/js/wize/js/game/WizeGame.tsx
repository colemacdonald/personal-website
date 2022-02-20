import { util } from "../util.js";
import { ControllableCharacter } from "./sprites/ControllableCharacter";
import { Room } from "./Room";

class WizeGame {
  height: number;
  width: number;
  fps: number;
  speed: number;
  grav: number;
  room: Room;
  character: ControllableCharacter;
  onGround: boolean;

  gameOptions: GameOptions;

  playerAlive: boolean;
  score: number;

  /**
   * Create a new game
   */
  constructor(options: GameOptions, room: Room, character: ControllableCharacter) {
    this.gameOptions = options;
    this.height = options.height;
    this.width = options.width;
    this.fps = options.fps;
    this.speed = options.speed;
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
