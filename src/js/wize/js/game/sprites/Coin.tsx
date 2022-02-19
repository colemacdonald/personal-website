import { COIN_FRAMES } from "../../frames/CoinFrames";

class Coin {
  x: number;
  y: number;
  r: number;

  imageCounter: number;
  frameCounter: number;

  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.r = options.r ? options.r : 15;

    this.imageCounter = Math.floor(Math.random() * COIN_FRAMES.sources.length);
    this.frameCounter = 0;
  }

  getImageIndex() {
    this.frameCounter = (this.frameCounter + 1) % 4;

    if (this.frameCounter === 0) {
      this.imageCounter = (this.imageCounter + 1) % COIN_FRAMES.sources.length;
    }

    return this.imageCounter;
  }
}

export { Coin };
