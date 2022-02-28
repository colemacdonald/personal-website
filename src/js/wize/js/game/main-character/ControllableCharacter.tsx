import { Character } from "./Character";
import { Direction } from "../Frames";

class ControllableCharacter extends Character {
    upPressed: boolean;
    maxJmpCnt: number = 1;

    baseSpeed: number;
    canRun: boolean = false;
    running: boolean = false;

    constructor(options) {
        super(options);

        this.baseSpeed = this.speed;
    }

    //override
    move() {
        if (this.running) {
            this.speed += 0.2;
            this.speed = Math.min(this.speed, 12);
        }

        super.move();
    }
    
    // override
    incrementFrameCounter(): void {
        super.incrementFrameCounter();

        // move through frames relative to our speed
        this.frameCounter = Math.floor(this.frameCounter + this.speed / this.baseSpeed - 1);
    }

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
        // don't allow through the floor of through tall platforms
        if (this.currentPlatform && (this.currentPlatform.w > this.game.room.w || this.currentPlatform.h > 50)) {
            return;
        }

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

    runStart() {
        if (this.canRun) {
            this.running = true;
            this.speed = this.baseSpeed * 2;
        }
    }

    runEnd() {
        this.running = false;
        this.speed = this.baseSpeed;
    }
}

export { ControllableCharacter };
