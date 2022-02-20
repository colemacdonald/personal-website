
class Fountain {
  x: number;
  y: number;
  h: number;
  w: number

  imageCounter: number;
  frameCounter: number;

  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.h = options.h;
    this.w = options.w;

    this.imageCounter = Math.floor(Math.random() * FOUNTAIN_FRAMES.sources.length);
    this.frameCounter = 0;
  }

  getImageIndex() {
    this.frameCounter = (this.frameCounter + 1) % 4;

    if (this.frameCounter === 0) {
      this.imageCounter = (this.imageCounter + 1) % FOUNTAIN_FRAMES.sources.length;
    }

    return this.imageCounter;
  }
}

let FOUNTAIN_FRAMES = {
    sources: [
      require("../../../../resources/wize/fountain/fountain0000.png"),
      require("../../../../resources/wize/fountain/fountain0001.png"),
      require("../../../../resources/wize/fountain/fountain0002.png"),
      require("../../../../resources/wize/fountain/fountain0003.png"),
    ],
    images: [],
  };

export { Fountain, FOUNTAIN_FRAMES };
