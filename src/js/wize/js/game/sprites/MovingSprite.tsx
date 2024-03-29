import { Direction, Frame, State } from '../Frames';
import { SpriteBase } from './SpriteBase';

export class MovingSprite extends SpriteBase {
  frameCounter: number;
  ticksOnFrame: number;
  state: State;

  inFrontOfPlatforms: boolean = true;

  h: number;
  w: number;

  relativeHitBoxes: Array<Rectangle>;
  relativeHurtBoxes: Array<Rectangle>;

  direction: Direction;

  constructor(s: { frames: any; x: number; y: number; scale: number }) {
    super(s);

    this.frameCounter = 0;
    this.ticksOnFrame = 0;
    this.state = State.Idle;
    this.direction = Direction.Right;
  }

  get drawBox(): Rectangle {
    let f = this.getFrame();
    return { x: this.x + f.x_offset, y: this.y + f.y_offset, w: this.w + f.width_extend, h: this.h + f.height_extend };
  }

  get hurtBoxes(): Array<Rectangle> {
    var boxes = [];

    this.getFrame().relativeHurtBoxes.forEach(function (box) {
      boxes.push({
        x: box.x + this.x,
        y: box.y + this.y,
        h: box.h,
        w: box.w
      });
    }, this);

    return boxes;
  }

  tick() {
    this.move();
    this.incrementFrameCounter();
  }

  move() {}

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

  getFrame(): Frame {
    // Make sure counter fits in our current state
    this.frameCounter = this.frameCounter % this.frames[this.state][this.direction].length;
    return this.frames[this.state][this.direction][this.frameCounter];
  }
}
