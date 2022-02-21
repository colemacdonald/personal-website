import { Frame } from "../Frames";

class Door implements ISprite {
    box: Rectangle;
    inFrontOfPlatforms: boolean = true;

    destRoom: number;
    destX: number;
    destY: number;

    constructor(x: number, y: number, destRoom: number, destX: number, destY: number) {
        this.box = { x: x, y: y, h: 100, w: 86 };

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