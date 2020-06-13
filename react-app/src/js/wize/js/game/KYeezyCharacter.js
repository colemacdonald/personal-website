import { ControllableCharacter, DIRECTIONS } from "./ControllableCharacter.js";
import { _ } from "underscore";

let STATES = {
  IDLE: {
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

    // Bootstrap Images
    _.each(STATES, function (state) {
      state.right.images = [];
      _.each(state.right.sources, function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        state.right.images.push(img);
      });

      state.left.images = [];
      _.each(state.left.sources, function (imgSrc) {
        let img = new Image();
        img.src = imgSrc;
        state.left.images.push(img);
      });
    });
  }

  getFrame() {
    var frameGroup;

    // Find group
    if (this.onG && this.xv !== 0) {
      frameGroup = STATES.WALKING;

      // Update counter
      this.frameCounter =
        (this.frameCounter + 1) % frameGroup[this.direction].images.length;
      return {
        img: frameGroup[this.direction].images[this.frameCounter],
        x_offset: frameGroup[this.direction].x_offset,
        width_extend: frameGroup[this.direction].width_extend,
      };
    }

    if (this.direction === DIRECTIONS.LEFT) {
      let img = new Image();
      img.src = "resources/wize/kyell_still_left.png";
      return { img: img, x_offset: 0, width_extend: 0 };
    } else {
      let img = new Image();
      img.src = "resources/wize/kyell_still_right.png";
      return { img: img, x_offset: 0, width_extend: 0 };
    }
  }
}

export { STATES, KYeezy };
