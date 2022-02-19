import { Coin } from "./sprites/Coin";
import Door from "./sprites/Door";
import { Monster } from "./sprites/Monster";

type Room = {
    h: number,
    w: number,
    platforms: Array<Rectangle>,
    monsters: Array<Monster>,
    coins: Array<Coin>,
    doors: Array<Door>
}

function CreateRoomWithFloor(h: number, w: number) : Room {
    return {
        h: h,
        w: w,
        platforms: [{x: 0, y: h, w: w, h: 150}],
        monsters: [],
        coins: [],
        doors: []
    };
}

export { Room, CreateRoomWithFloor };