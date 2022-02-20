import { Direction, Frame, State } from "../Frames";

class MovingSprite implements ISprite {
    frameCounter: number;

    x: number;
    y: number;
    h: number;
    w: number;

    relativeHitBoxes: Array<Rectangle>;
    relativeHurtBoxes: Array<Rectangle>;

    state: State;
    frames: any;
    direction: Direction;

    constructor(frames) {
        this.frames = frames;
        this.frameCounter = 0;
        this.state = State.Idle;
        this.direction = Direction.Right;
    }

    get box(): Rectangle {
        return { x: this.x + this.frames[this.state][this.direction].x_offset, y: this.y, w: this.w + this.frames[this.state][this.direction].width_extend, h: this.h };
    }

    get hurtBoxes(): Array<Rectangle> {
        var boxes = [];

        this.relativeHurtBoxes.forEach(function (box) {
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
        return [{ x: this.x + this.frames[this.state][this.direction].x_offset, y: this.y, w: this.w + this.frames[this.state][this.direction].width_extend, h: this.h }];
    }

    tick() {
        this.move();
        this.incrementFrameCounter();
    }

    move() {
        
    }

    incrementFrameCounter() {
        this.frameCounter++;

        let frameGroup = this.frames[this.state][this.direction];
        // Make sure counter fits in our current state
        this.frameCounter =
            this.frameCounter % frameGroup.images.length;
    }

    getFrame() : Frame {
        return this.frames[this.state][this.direction].images[this.frameCounter];
    }
}

export { MovingSprite } 