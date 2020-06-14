import { Coin } from "./Coin.js";
import { util } from "../util.js";
import { KYeezy } from "./KYeezyCharacter.js";
import { Monster } from "./Monster.js";
import { _ } from "underscore";

class WizeGame {
  /**
   * Create a new game
   */
  constructor() {
    this.fps = 60;
    this.speed = 3;

    this.platforms = [{ x: 0, y: 1500, h: 150, w: 2000 }];
    this.monsters = [];
    this.coins = [];

    this.playerAlive = true;
    this.grav = 0.5;

    this.score = 0;

    this.height = 1500;
    this.width = 2000;

    this.character = new KYeezy({ game: this });
    this.character.setPosition(100, 1300);

    while (this.platforms.length < 50) {
      let newPlat = {
        x: Math.random() * (this.width - 400),
        y: Math.random() * this.height,
        h: 50,
        w: Math.ceil(Math.random() * 5 + 1) * 50,
      };

      if (!util.doRectangleArraysOverlap(this.platforms, [newPlat])) {
        this.platforms.push(newPlat);
      }
    }

    let i = 0;
    while (this.monsters.length < 20) {
      if (
        !util.doRectangleArraysOverlap(
          [this.platforms[i]],
          [
            {
              x: this.character.x - 10,
              y: this.character.y - this.character.h - 30,
              h: 400,
              w: 200,
            },
          ]
        )
      ) {
        this.monsters.push(
          new Monster({
            platform: this.platforms[i],
            x: this.platforms[i].x + this.platforms[i].w / 2,
            y: this.platforms[i].y - 20,
            h: 50,
            w: 20,
            speed: 2,
          })
        );
      }
      i++;
    }

    for (let i = 0; i < 20; i++) {
      this.coins.push(
        new Coin({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
        })
      );
    }
  }

  /**
   * Update the game state to the next frame
   */
  update() {
    // If the character on a platform?
    this.onGround = false;
    this.character.onG = false;
    _.each(
      this.platforms,
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
      this.monsters,
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
      this.coins,
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
          indices.push(this.coins.indexOf(coin));
        }
      },
      this
    );

    // Remove coins from game
    for (var i = indices.length - 1; i >= 0; i--) {
      this.score += 100;
      this.coins.splice(indices[i], 1);
    }

    // Don't let character fall below stage
    if (this.character.y > this.height)
      this.character.y = this.platforms[0].y - this.character.h - 5;
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
