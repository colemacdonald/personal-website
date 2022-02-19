import { util } from "../util.js";
import { _ } from "underscore";

class WizeGame {
  /**
   * Create a new game
   */
  constructor(options, level, character) {
    this.height = options.height;
    this.width = options.width;
    this.fps = options.fps;
    this.speed = options.speed;
    this.grav = options.grav;
    this.level = level;
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
    _.each(
      this.level.platforms,
      function (plat) {
        if (
          util.doRectanglesOverlap(
            this.character.x,
            this.character.y + this.character.h * 0.95,
            this.character.h * 0.1,
            this.character.w,
            plat.x,
            plat.y,
            plat.h,
            plat.w
          ) &&
          !this.character.onG &&
          this.character.yv > 0
        ) {
          this.character.setCurrentPlatform(plat);
          this.onGround = true;
        }
      },
      this
    );

    // Move
    this.character.move();

    _.each(
      this.level.monsters,
      function (monster) {
        if (
          util.doRectangleArraysOverlap(this.character.getHurtBoxes(), [
            { x: monster.x, y: monster.y, h: monster.h, w: monster.w },
          ])
        ) {
          this.playerAlive = false;
        }
        monster.move();
      },
      this
    );

    var indices = [];
    _.each(
      this.level.coins,
      function (coin) {
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
          indices.push(this.level.coins.indexOf(coin));
        }
      },
      this
    );

    // Remove coins from game
    for (var i = indices.length - 1; i >= 0; i--) {
      this.score += 100;
      this.level.coins.splice(indices[i], 1);
    }

    // Don't let character fall below stage
    if (this.character.y > this.height)
      this.character.y = this.level.platforms[0].y - this.character.h - 5;
  }

  getMainCharacter() {
    return this.character;
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
