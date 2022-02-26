import { Frame } from "../Frames"
import { SpriteBase } from "../sprites/SpriteBase";


class BackgroundElement extends SpriteBase {
        type: BackgroundElementType;
    inFrontOfPlatforms: boolean = false;
    scale: number = 1;

    constructor(options) {
        super({frames: [BACKGROUND_ELEMENT_FRAMES[options.type]], x: options.x, y: options.y, scale: options.scale || 1});
        this.type = options.type;

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;
    }

    tick() { }

    getFrame(): Frame {
        return ;
    }
}

enum BackgroundElementType {
    PixelDay,
    PixelNight,
    TreesDay
}

let BACKGROUND_ELEMENT_FRAMES = {};



BACKGROUND_ELEMENT_FRAMES[BackgroundElementType.TreesDay] = new Frame({src: require("../../../../../resources/wize/backgrounds/day/5.png")});
BACKGROUND_ELEMENT_FRAMES[BackgroundElementType.PixelDay] = new Frame({src: require("../../../../../resources/wize/backgrounds/day/1.png")});


let BACKGROUND_ELEMENT_SIZES = {};
BACKGROUND_ELEMENT_SIZES[BackgroundElementType.TreesDay] = {w: 1152, h: 460 };
BACKGROUND_ELEMENT_SIZES[BackgroundElementType.PixelDay] = {w: 1152, h: 460 };

export { BackgroundElement, BackgroundElementType }