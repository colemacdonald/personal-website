import { Frame, State } from "../Frames";
import { StationarySprite } from "../sprites/StationarySprite";

class AnimatedBackgroundElement extends StationarySprite {
    constructor(options) {
        super(AnimatedBackgroundElementFrames[options.type]);

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;

        let scale = options.scale || 1;

        this.drawBox = { x: options.x, y: options.y, w: 100 * scale, h: 100 * scale };

        this.frameCounter = 0;
    }
}

enum AnimatedBackgroundElementType {
    Fountain, 
    Torch1, Torch2, Torch3
}

let AnimatedBackgroundElementFrames = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Fountain] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Fountain][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0000.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0001.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0002.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/fountain/fountain0003.png"), ticks: 5}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch1] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch1][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/torches/torch1_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch1_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch1_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch1_4.png"), ticks: 12}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch2] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch2][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/torches/torch2_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch2_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch2_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch2_4.png"), ticks: 12}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch3] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch3][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/torches/torch3_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch3_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch3_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/torches/torch3_4.png"), ticks: 12}),
];

export { AnimatedBackgroundElement, AnimatedBackgroundElementType }