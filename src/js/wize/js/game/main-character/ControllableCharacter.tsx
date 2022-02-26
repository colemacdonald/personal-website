import { Character } from "./Character";
import { Direction } from "../Frames";

class ControllableCharacter extends Character {
    upPressed: boolean;
    maxJmpCnt: number = 1;
    healthPoints: number = 1;

    /************* CONTROLS **************/
    // To make characters do weird things, edit these functions!
    leftPress() {
        this.movingLeft = true;
        this.direction = Direction.Left;
    }

    leftRelease() {
        this.movingLeft = false;
    }

    rightPress() {
        this.movingRight = true;
        this.direction = Direction.Right;
    }

    rightRelease() {
        this.movingRight = false;
    }

    upPress() {
        if (this.upPressed) return;

        if (this.jmpCnt < this.maxJmpCnt) {
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

    attack() {
        
    }
}

export { ControllableCharacter };
