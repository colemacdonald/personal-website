import { util } from "../../util";
import { Frame, State } from "../Frames";
import { StationarySprite } from "./StationarySprite";

class Coin extends StationarySprite {
    r: number;

    get drawBox() {
        return { x: this.x - this.r, y: this.y - this.r, h: 2 * this.r, w: 2 * this.r };
    }

    constructor(options) {
        super({frames: COIN_FRAMES, x: options.x, y: options.y, scale: 1});

        this.r = options.r ? options.r : 15;

        this.frameCounter = Math.floor(Math.random() * COIN_FRAMES[State.Idle].length);
    }
}


let COIN_FRAMES = {};
COIN_FRAMES[State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/coin/coin0000.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0001.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0002.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0003.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0004.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0005.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0006.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0007.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0008.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0009.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0010.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0011.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0012.png"), ticks: 2}),
    new Frame({src: require("../../../../../resources/wize/coin/coin0013.png"), ticks: 2})
];

export { Coin, COIN_FRAMES };
