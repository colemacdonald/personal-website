import { Frame, State } from "../Frames";
import { StationarySprite } from "../sprites/StationarySprite";

class AnimatedBackgroundElement extends StationarySprite {

    get drawBox() {
        return  { x: this.x, y: this.y, w: 100 * this.scale, h: 100 * this.scale };
    }

    constructor(options) {
        super({frames: AnimatedBackgroundElementFrames[options.type], x: options.x, y: options.y, scale: options.scale || 1});

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;
    }
}

enum AnimatedBackgroundElementType {
    Fountain, 
    Torch1, Torch2, Torch3,
    LavaDrop1
}

let AnimatedBackgroundElementFrames = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Fountain] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Fountain][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/background-elements/fountain/fountain0000.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/background-elements/fountain/fountain0001.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/background-elements/fountain/fountain0002.png"), ticks: 5}),
    new Frame({src: require("../../../../../resources/wize/background-elements/fountain/fountain0003.png"), ticks: 5}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch1] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch1][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch1_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch1_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch1_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch1_4.png"), ticks: 12}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch2] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch2][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch2_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch2_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch2_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch2_4.png"), ticks: 12}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch3] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.Torch3][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch3_1.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch3_2.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch3_3.png"), ticks: 12}),
    new Frame({src: require("../../../../../resources/wize/background-elements/torches/torch3_4.png"), ticks: 12}),
];

AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.LavaDrop1] = {};
AnimatedBackgroundElementFrames[AnimatedBackgroundElementType.LavaDrop1][State.Idle] = [
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_1.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_2.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_3.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_4.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_5.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_6.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_7.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_8.png"), ticks: 20}),
    new Frame({src: require("../../../../../resources/wize/background-elements/lava-drop/lava_drop1_9.png"), ticks: 20}),
];

export { AnimatedBackgroundElement, AnimatedBackgroundElementType }