import { Frame } from "../Frames";

export class SpriteBase {
    scale: number = 1;
    x: number;
    y: number;

    frames: any;

    frameCounter: number = 0;

    inFrontOfPlatforms: boolean = true;

    get drawBox(): Rectangle {
        let f = this.getFrame();
        return { x: this.x + f.x_offset, y: this.y + f.y_offset, w: f.img.naturalWidth * this.scale, h: f.img.naturalHeight * this.scale };
    }

    get hitBoxes(): Array<Rectangle> {
        var boxes = [];

        this.getFrame().relativeHitBoxes.forEach(function (box) {
            boxes.push({
                x: box.x + this.x,
                y: box.y + this.y,
                h: box.h,
                w: box.w,
            });
        }, this);

        return boxes;
    }

    constructor(s: {frames: any, x: number, y: number, scale: number}) {
        this.frames = s.frames;
        this.x = s.x;
        this.y = s.y;
        this.scale = s.scale;
    }

    tick() {}

    getFrame(): Frame {
        return this.frames[this.frameCounter];
    }
}