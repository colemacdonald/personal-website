import { Frame } from "../Frames";
import { SpriteBase } from "../sprites/SpriteBase";

class StaticElement extends SpriteBase {
    type: StaticElementType;
    inFrontOfPlatforms: boolean = false;

    constructor(options) {
        super({frames: [STATIC_ELEMENT_FRAMES[options.type]], x: options.x, y: options.y, scale: options.scale || 1})

        this.type = options.type;

        this.inFrontOfPlatforms = options.inFrontOfPlatforms || false;
    }

    tick() { }
}

enum StaticElementType {
    Tree1, Tree2, Tree3, Tree4,
    Stone1, Stone2, Stone3, Stone4, Stone5, Stone6,
    AutumnTree1, AutumnTree2, AutumnBush1, AutumnBush2
}


let STATIC_ELEMENT_FRAMES = {};
let STATIC_ELEMENT_SIZES = {};

/************************* Trees ****************************/

STATIC_ELEMENT_FRAMES[StaticElementType.Tree1] = new Frame({src: require("../../../../../resources/wize/background-elements/trees/Tree1.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Tree2] = new Frame({src: require("../../../../../resources/wize/background-elements/trees/Tree2.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Tree3] = new Frame({src: require("../../../../../resources/wize/background-elements/trees/Tree3.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Tree4] = new Frame({src: require("../../../../../resources/wize/background-elements/trees/Tree4.png")});


STATIC_ELEMENT_SIZES[StaticElementType.Tree1] = { w: 62, h: 103 };
STATIC_ELEMENT_SIZES[StaticElementType.Tree2] = { w: 124, h: 129 };
STATIC_ELEMENT_SIZES[StaticElementType.Tree3] = { w: 175, h: 190 };
STATIC_ELEMENT_SIZES[StaticElementType.Tree4] = { w: 175, h: 190 };



/************************* Stones **********************/

STATIC_ELEMENT_FRAMES[StaticElementType.Stone1] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/1.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Stone2] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/2.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Stone3] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/3.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Stone4] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/4.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Stone5] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/5.png")});
STATIC_ELEMENT_FRAMES[StaticElementType.Stone6] = new Frame({src: require("../../../../../resources/wize/background-elements/stones/6.png")});

STATIC_ELEMENT_SIZES[StaticElementType.Stone1] = { w: 10, h: 7 };
STATIC_ELEMENT_SIZES[StaticElementType.Stone2] = { w: 22, h: 14 };
STATIC_ELEMENT_SIZES[StaticElementType.Stone3] = { w: 27, h: 16 };
STATIC_ELEMENT_SIZES[StaticElementType.Stone4] = { w: 39, h: 17 };
STATIC_ELEMENT_SIZES[StaticElementType.Stone5] = { w: 49, h: 22 };
STATIC_ELEMENT_SIZES[StaticElementType.Stone6] = { w: 70, h: 44 };

/********************* Autumn Trees ********************/
STATIC_ELEMENT_FRAMES[StaticElementType.AutumnTree1] = new Frame({src: require("../../../../../resources/wize/backgrounds/autumn/tree1.png")});
STATIC_ELEMENT_SIZES[StaticElementType.AutumnTree1] = {w: 828, h: 832};

export { StaticElement, StaticElementType }