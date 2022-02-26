import { Frame, State } from "../Frames";
import { SpriteBase } from "./SpriteBase";

class StationarySprite extends SpriteBase {
    scale: number = 1;

    frameCounter: number = 0;
    ticksOnFrame: number = 0;
    state: State = State.Idle;


    constructor(s: {frames: any, x: number, y: number, scale: number}) {
        super(s);
    }

    tick() {
        let currentFrame = this.getFrame();
        this.ticksOnFrame++;

        // next frame
        if (this.ticksOnFrame > currentFrame.ticks) {
            this.frameCounter++;
            this.ticksOnFrame = 0;
        }

        // Make sure counter fits in our current state
        this.frameCounter = this.frameCounter % this.frames[this.state].length;
    }

    getFrame(): Frame {
        // Make sure counter fits in our current state
        this.frameCounter = this.frameCounter % this.frames[this.state].length;
        return this.frames[this.state][this.frameCounter];
    }
}

export { StationarySprite }