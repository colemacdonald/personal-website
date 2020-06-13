let COIN_FRAMES = {
  sources: [
    "resources/wize/coin/coin0000.png",
    "resources/wize/coin/coin0001.png",
    "resources/wize/coin/coin0002.png",
    "resources/wize/coin/coin0003.png",
    "resources/wize/coin/coin0004.png",
    "resources/wize/coin/coin0005.png",
    "resources/wize/coin/coin0006.png",
    "resources/wize/coin/coin0007.png",
    "resources/wize/coin/coin0008.png",
    "resources/wize/coin/coin0009.png",
    "resources/wize/coin/coin0010.png",
    "resources/wize/coin/coin0011.png",
    "resources/wize/coin/coin0012.png",
    "resources/wize/coin/coin0013.png",
  ],
  images: [],
};

class Coin {
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

export { Coin, COIN_FRAMES };
