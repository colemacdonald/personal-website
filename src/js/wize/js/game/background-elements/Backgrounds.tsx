import { Frame } from "../Frames"


class BackgroundElement implements ISprite {
    box: Rectangle;
    type: BackgroundElementType;
    inFrontOfPlatforms: boolean = false;

    constructor(options) {
        this.type = options.type;
        let scale = options.scale || 1;

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;

        this.box = { x: options.x, y: options.y, w: BACKGROUND_ELEMENT_SIZES[this.type].w * scale, h: BACKGROUND_ELEMENT_SIZES[this.type].h * scale };
    }

    tick() { }

    getFrame(): Frame {
        return BACKGROUND_ELEMENT_FRAMES[this.type];
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