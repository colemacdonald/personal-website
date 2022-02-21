import { Frame, State } from "../Frames";

class StationarySprite implements ISprite {
    box: Rectangle;

    frameCounter: number = 0;
    ticksOnFrame: number = 0;
    state: State = State.Idle;
    frames: any;
    inFrontOfPlatforms: boolean = false;

    constructor(frames) {
        this.frames = frames;
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