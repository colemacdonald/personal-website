import { ControllableCharacter } from "./ControllableCharacter";
import { State, FrameGroup, FrameSet, FRAMES } from "./KYeezyFrames";

class KYeezy extends ControllableCharacter {
  state: State;
  
  get box() : Rectangle {
    return {x: this.x + FRAMES[this.state][this.direction].x_offset, y: this.y, w: this.w + FRAMES[this.state][this.direction].width_extend, h: this.h};
  }

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
  }


  getNextFrame() {
    return FRAMES[this.state][this.direction].images[this.frameCounter];
  }
  

  move() {
    super.move();
    this.updateState();
    this.incrementFrameCounter();
  }

  incrementFrameCounter() {
    this.frameCounter++;

    let frameGroup = FRAMES[this.state];
    // Make sure counter fits in our current state
    this.frameCounter =
      this.frameCounter % frameGroup[this.direction].images.length;
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
}

export { KYeezy };
