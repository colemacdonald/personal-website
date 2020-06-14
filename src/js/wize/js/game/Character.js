import { _ } from "underscore";
import { util } from "../util.js";

let DIRECTIONS = {
  RIGHT: "right",
  LEFT: "left",
};

/**
 * To be used as a base class for creating new characters - mainly to allow the implementation though I'm not sure
 * we are going to need this level of abstraction but just incase
 * Call the super class constructor if your are extending this class
 */
class Character {
  constructor(options) {
    // Options must contain the game object
    this.game = options.game;

    // Positioning and Movement
    this.x = options.x ? options.x : 0;
    this.y = options.y ? options.y : 0;
    this.h = options.h ? options.h : 50;
    this.w = options.w ? options.w : 25;

    this.xv = options.xv ? options.xv : 0;
    this.yv = options.yv ? options.yv : 0;
    this.speed = options.speed ? options.speed : 3;

    // Status and Inputs
    this.onG = false;
    this.movingRight = false;
    this.movingLeft = false;
    this.jmpCnt = 0;
    this.fall = false;
    this.alive = true;
    this.fallThroughPlatform = false;

    // Interaction
    this.hurtBoxes = []; // List of rectangles relative to px,py
    this.hitBoxes = []; // List of rectangles relative to px,py
    this.currentPlatform = null;

    // Animation
    this.direction = DIRECTIONS.RIGHT;
    this.frameCounter = 0;
  }

  // Called when game determines that you are on a platform
  setCurrentPlatform(plat) {
    this.currentPlatform = plat;
    this.jmpCnt = 0;

    if (!this.fall && !this.fallThroughPlatform) {
      this.y = plat.y - this.h;
      this.onG = true;
    }
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVelocities(xv, yv) {
    this.xv = xv;
    this.yv = yv;
  }

  /**
   *	very basic move function, overwrite if necessary
   */
  move() {
    // Are you moving
    if (this.movingLeft) {
      this.xv = -this.speed;
    } else if (this.movingRight) {
      this.xv = this.speed;
    }

    // slow down or fall
    if (this.onG) {
      this.xv *= 0.75;

      // Animation won't stop properly other wise
      if (Math.abs(this.xv) < 0.5) {
        this.xv = 0;
      }
    } else {
      this.yv += this.game.grav;
    }

    this.x += this.xv;
    this.y += this.yv;

    if (this.fall && this.currentPlatform) {
      this.fallThroughPlatform = true;
    }

    if (
      this.fallThroughPlatform &&
      this.currentPlatform &&
      !util.doRectanglesOverlap(
        this.x,
        this.y + this.h * 0.95,
        this.h * 0.1,
        this.w,
        this.currentPlatform.x,
        this.currentPlatform.y,
        this.currentPlatform.h,
        this.currentPlatform.w
      )
    ) {
      this.fallThroughPlatform = false;
      this.currentPlatform = null;
    }
  }

  getFrame() {}

  getHurtBoxes() {
    var hurtBoxes = [];

    _.each(
      this.hurtBoxes,
      function (box) {
        hurtBoxes.push({
          x: box.x + this.x,
          y: box.y + this.y,
          h: box.h,
          w: box.w,
        });
      },
      this
    );

    return hurtBoxes;
  }
}

export { DIRECTIONS, Character };
