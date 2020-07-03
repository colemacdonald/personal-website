import { ControllableCharacter, DIRECTIONS } from "./ControllableCharacter.js";
import { _ } from "underscore";

let STATES = {
  IDLE: "IDLE",
  WALKING: "WALKING",
  JUMPING: "JUMPING",
  INAIR: "INAIR",
};

let FRAMES = {
  IDLE: {
    right: {
      sources: ["resources/wize/kyell_still_right.png"],
      images: [],
      x_offset: 0,
      width_extend: 0,
    },
    left: {
      sources: ["resources/wize/kyell_still_left.png"],
      images: [],
      x_offset: 0,
      width_extend: 0,
    },
  },
  WALKING: {
    right: {
      x_offset: -41,
      width_extend: 41,
      sources: [
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0000.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0000.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0001.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0001.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0002.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0002.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0003.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0003.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0004.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0004.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0005.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0005.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0006.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0006.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0007.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0007.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0008.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0008.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0009.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0009.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0010.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0010.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0011.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0011.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0012.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0012.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0013.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_right0013.png",
      ],
      images: [],
    },
    left: {
      x_offset: 0,
      width_extend: 41,
      sources: [
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0000.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0000.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0001.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0001.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0002.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0002.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0003.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0003.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0004.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0004.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0005.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0005.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0006.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0006.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0007.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0007.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0008.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0008.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0009.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0009.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0010.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0010.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0011.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0011.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0012.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0012.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0013.png",
        "resources/wize/kyell_walk/kyell_walk_hairmove_left0013.png",
      ],
    },
  },
  JUMPING: {
    right: {
      sources: [],
      images: [],
      x_offset: 0,
    },
    left: {
      sources: [],
      images: [],
      x_offset: 0,
    },
  },
  INAIR: {
    right: {
      sources: [
        // "resources/wize/kyell_jump/kyell_jump_right0000.png",
        // "resources/wize/kyell_jump/kyell_jump_right0001.png",
        // "resources/wize/kyell_jump/kyell_jump_right0002.png",
        // "resources/wize/kyell_jump/kyell_jump_right0003.png",
        "resources/wize/kyell_jump/kyell_jump_right0004.png",
      ],
      images: [],
      x_offset: 0,
      width_extend: 0,
    },
    left: {
      sources: ["resources/wize/kyell_jump/kyell_jump_left0004.png"],
      images: [],
      x_offset: 0,
      width_extend: 0,
    },
  },
};

class KYeezy extends ControllableCharacter {
  constructor(options) {
    options = options || {};
    options.speed = 4;

    options.h = 80;
    options.w = 40;

    // Call super class constructor
    super(options);

    // Based of top left corner
    this.hurtBoxes = [{ x: 5, y: 10, h: 70, w: 30 }];
    this.hitBoxes = [];

    // For the getFrame fsm
    this.state = STATES.IDLE;

    // Bootstrap Images
    _.each(FRAMES, function (frameGroup) {
      frameGroup.right.images = [];
      _.each(frameGroup.right.sources, function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        frameGroup.right.images.push(img);
      });

      frameGroup.left.images = [];
      _.each(frameGroup.left.sources, function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        frameGroup.left.images.push(img);
      });
    });
  }

  move() {
    super.move();

    this.updateState();

    this.frameCounter++;
  }

  updateState() {
    /// landing
    if (this.state === STATES.INAIR && this.xv === 0) {
    }

    if (this.onG) {
      if (this.xv === 0) {
        this.state = STATES.IDLE;
      } else {
        this.state = STATES.WALKING;
      }
    } else {
      this.state = STATES.INAIR;
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

export { STATES, KYeezy };
