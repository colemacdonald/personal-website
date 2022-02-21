import { Frame } from "../Frames";

class Door implements ISprite {
    drawBox: Rectangle;
    hitBoxes: Array<Rectangle>;
    inFrontOfPlatforms: boolean = true;

    destRoom: number;
    destX: number;
    destY: number;

    constructor(x: number, y: number, destRoom: number, destX: number, destY: number) {
        this.drawBox = { x: x, y: y, h: 100, w: 86 };

        this.hitBoxes = [{x: x + 20, y: y + 20, h: 80, w: 60 }];

        this.destRoom = destRoom;
        this.destX = destX;
        this.destY = destY;
    }

    tick() { }

    getFrame() {
        return FRAME;
    }
}

let FRAME = new Frame({src: require("../../../../../resources/wize/doors/door1.png")});

export default Door;