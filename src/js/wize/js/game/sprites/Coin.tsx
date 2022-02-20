import { util } from "../../util";

class Coin implements ISprite {
  box: Rectangle;

  x: number;
  y: number;
  r: number;

  imageCounter: number;
  frameCounter: number;

  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.r = options.r ? options.r : 15;

    this.box = { x: this.x - this.r, y: this.y - this.r, h: 2 * this.r, w: 2 * this.r };

    this.imageCounter = Math.floor(Math.random() * COIN_FRAMES.sources.length);
    this.frameCounter = 0;
  }

  getNextFrame() {
    this.frameCounter = (this.frameCounter + 1) % 4;

    if (this.frameCounter === 0) {
      this.imageCounter = (this.imageCounter + 1) % COIN_FRAMES.sources.length;
    }

    return COIN_FRAMES.images[this.imageCounter];
  }
}

let COIN_FRAMES = {
  sources: [
    require("../../../../../resources/wize/coin/coin0000.png"),
    require("../../../../../resources/wize/coin/coin0001.png"),
    require("../../../../../resources/wize/coin/coin0002.png"),
    require("../../../../../resources/wize/coin/coin0003.png"),
    require("../../../../../resources/wize/coin/coin0004.png"),
    require("../../../../../resources/wize/coin/coin0005.png"),
    require("../../../../../resources/wize/coin/coin0006.png"),
    require("../../../../../resources/wize/coin/coin0007.png"),
    require("../../../../../resources/wize/coin/coin0008.png"),
    require("../../../../../resources/wize/coin/coin0009.png"),
    require("../../../../../resources/wize/coin/coin0010.png"),
    require("../../../../../resources/wize/coin/coin0011.png"),
    require("../../../../../resources/wize/coin/coin0012.png"),
    require("../../../../../resources/wize/coin/coin0013.png"),
  ],
  images: [],
};

util.bootstrapImages(COIN_FRAMES);

export { Coin, COIN_FRAMES };
