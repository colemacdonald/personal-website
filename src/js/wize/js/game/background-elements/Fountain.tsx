import { util } from "../../util";

class Fountain implements ISprite {
    box: Rectangle;

    imageCounter: number;
    frameCounter: number;

    constructor(box: Rectangle) {
        this.box = box;

        this.imageCounter = Math.floor(Math.random() * FOUNTAIN_FRAMES.sources.length);
        this.frameCounter = 0;
    }

    getNextFrame() {
        this.frameCounter = (this.frameCounter + 1) % 4;

        if (this.frameCounter === 0) {
            this.imageCounter = (this.imageCounter + 1) % FOUNTAIN_FRAMES.sources.length;
        }

        return FOUNTAIN_FRAMES.images[this.imageCounter];
    }
}

let FOUNTAIN_FRAMES = {
    sources: [
        require("../../../../resources/wize/fountain/fountain0000.png"),
        require("../../../../resources/wize/fountain/fountain0000.png"),
        require("../../../../resources/wize/fountain/fountain0001.png"),
        require("../../../../resources/wize/fountain/fountain0001.png"),
        require("../../../../resources/wize/fountain/fountain0002.png"),
        require("../../../../resources/wize/fountain/fountain0002.png"),
        require("../../../../resources/wize/fountain/fountain0003.png"),
        require("../../../../resources/wize/fountain/fountain0003.png"),
    ],
    images: [],
  };

util.bootstrapImages(FOUNTAIN_FRAMES);

export { Fountain, FOUNTAIN_FRAMES };
