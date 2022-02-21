import { Direction, Frame, State } from "../Frames";

class MovingSprite implements ISprite {
    frameCounter: number;
    ticksOnFrame: number;
    state: State;
    frames: any;

    inFrontOfPlatforms: boolean = true;

    x: number;
    y: number;
    h: number;
    w: number;

    relativeHitBoxes: Array<Rectangle>;
    relativeHurtBoxes: Array<Rectangle>;

    direction: Direction;

    constructor(frames) {
        this.frames = frames;
        this.frameCounter = 0;
        this.ticksOnFrame = 0;
        this.state = State.Idle;
        this.direction = Direction.Right;
    }

    get box(): Rectangle {
        return { x: this.x + this.getFrame().x_offset, y: this.y, w: this.w + this.getFrame().width_extend, h: this.h };
    }

    get hurtBoxes(): Array<Rectangle> {
        var boxes = [];

        this.getFrame().relativeHurtBoxes.forEach(function (box) {
            boxes.push({
                x: box.x + this.x,
                y: box.y + this.y,
                h: box.h,
                w: box.w,
            });
        }, this);

        return boxes;
    }

    get hitBoxes(): Array<Rectangle> {
        return [this.box];
    }

    tick() {
        this.move();
        this.incrementFrameCounter();
    }

    move() {

    }

    incrementFrameCounter(): void {
        let currentFrame = this.getFrame();
        this.ticksOnFrame++;

        // next frame
        if (this.ticksOnFrame > currentFrame.ticks) {
            this.frameCounter++;
            this.ticksOnFrame = 0;
        }

        // Make sure counter fits in our current state
        this.frameCounter = this.frameCounter % this.frames[this.state][this.direction].length;
    }

    getFrame() : Frame {
        // Make sure counter fits in our current state
        this.frameCounter = this.frameCounter % this.frames[this.state][this.direction].length;
        return this.frames[this.state][this.direction][this.frameCounter];
    }
}

export { MovingSprite } 