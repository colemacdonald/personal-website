import { Frame } from "./game/Frames";

//util.js
export class util {
    static doRectanglesOverlap(x1, y1, h1, w1, x2, y2, h2, w2) {
        if (x1 > x2 + w2 || x2 > x1 + w1) return false;

        // If one rectangle is above other
        if (y1 > y2 + h2 || y2 > y1 + h1) return false;

        return true;
    }

    static doRectangleArraysOverlap(array1, array2) {
        var overlap = false;

        array1.forEach((r1) => {
            array2.forEach((r2) => {
                // Neither beside, nor below
                if (
                    !(r1.x > r2.x + r2.w || r2.x > r1.x + r1.w) &&
                    !(r1.y > r2.y + r2.h || r2.y > r1.y + r1.h)
                ) {
                    overlap = true;
                }
            }, this)
        }, this);

        return overlap;
    }
}