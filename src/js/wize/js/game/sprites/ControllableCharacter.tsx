import { Character, DIRECTIONS } from "./Character";

class ControllableCharacter extends Character {
  upPressed: boolean;

  /************* CONTROLS **************/
  // To make characters do weird things, edit these functions!
  leftPress() {
    this.movingLeft = true;
    this.direction = DIRECTIONS.LEFT;
  }

  leftRelease() {
    this.movingLeft = false;
  }

  rightPress() {
    this.movingRight = true;
    this.direction = DIRECTIONS.RIGHT;
  }

  rightRelease() {
    this.movingRight = false;
  }

  upPress() {
    if (this.upPressed) return;

    if (this.jmpCnt < 2) {
      this.yv = -10;
      this.jmpCnt++;
    }
    this.upPressed = true;
  }

  upRelease() {
    this.upPressed = false;
    if (this.onG) {
      if (this.yv < -1) this.yv = -1;
    }
  }

  downPress() {
    this.fall = true;
    if (this.currentPlatform) {
      this.yv = 6 * this.game.grav;
    }
  }

  downRelease() {
    this.fall = false;
  }
}

export { ControllableCharacter, DIRECTIONS };