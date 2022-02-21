import { util } from "../../util";
import { Frame, State } from "../Frames";
import { StationarySprite } from "../sprites/StationarySprite";

class Fountain extends StationarySprite {
    constructor(options) {
        super(FOUNTAIN_FRAMES);

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;

        let scale = options.scale || 1;

        this.drawBox = { x: options.x, y: options.y, w: 100 * scale, h: 100 * scale };

        this.frameCounter = 0;
    }
}

let FOUNTAIN_FRAMES = {};
FOUNTAIN_FRAMES[State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0000.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0001.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0002.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0003.png"), ticks: 5}),
];

export { Fountain, FOUNTAIN_FRAMES };
