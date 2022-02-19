import { ControllableCharacter } from "./ControllableCharacter";
import { State, FrameGroup, FrameSet, FRAMES } from "../../frames/KYeezyFrames";

class KYeezy extends ControllableCharacter {
  state: State;

  constructor(options: any) {
    options.speed = 4;

    options.h = 80;
    options.w = 40;

    // Call super class constructor
    super(options);

    // Based of top left corner
    this.hurtBoxes = [{ x: 5, y: 10, h: 70, w: 30 }];
    this.hitBoxes = [];

    // For the getFrame fsm
    this.state = State.Idle;

    // Bootstrap Images

    for (let [state, value] of Object.entries(FRAMES)) {

      let frameGroup = value as FrameGroup;
      frameGroup.right.images = [];
      frameGroup.right.sources.forEach(function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        frameGroup.right.images.push(img);
      }, this);

      frameGroup.left.images = [];
      frameGroup.left.sources.forEach(function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        frameGroup.left.images.push(img);
      }, this);
    }
  }
  

  move() {
    super.move();

    this.updateState();

    this.frameCounter++;
  }

  updateState() {
    /// landing
    if (this.state === State.InAir && this.xv === 0) {
    }

    if (this.onG) {
      if (this.xv === 0) {
        this.state = State.Idle;
      } else {
        this.state = State.Walking;
      }
    } else {
      this.state = State.InAir;
    }
  }

  getFrame() {
    let frameGroup = FRAMES[this.state];

    // Make sure counter fits in our current state
    this.frameCounter =
      this.frameCounter % frameGroup[this.direction].images.length;
    return {
      img: frameGroup[this.direction].images[this.frameCounter],
      x_offset: frameGroup[this.direction].x_offset,
      width_extend: frameGroup[this.direction].width_extend,
    };
  }
}

export { KYeezy };
