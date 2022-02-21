import { Frame } from "./Frames";
import { Powerup } from "./Powerup";
import { Coin } from "./sprites/Coin";
import Door from "./sprites/Door";
import { Monster } from "./sprites/Monster";

class Room {
    h: number;
    w: number;
    platforms: Array<Rectangle> = [];
    monsters: Array<Monster> = [];
    coins: Array<Coin> = [];
    doors: Array<Door> = [];
    powerups: Array<Powerup> = [];
    backgroundElements: Array<ISprite> = [];
    backgroundColour: string = "#33beff";
    backgroundTheme: RoomBackgroundTheme = RoomBackgroundTheme.Empty;

    constructor(options) {
        this.h = options.h;
        this.w = options.w;
    }

    getBackgroundThemeTile(x: number, y: number): Frame {
        let index = (Math.floor(x / 50) + Math.floor(y / 50)) % ROOM_THEME_TILES[this.backgroundTheme].length;

        return ROOM_THEME_TILES[this.backgroundTheme][index];
    }
};

enum RoomBackgroundTheme {
    Empty,
    Dungeon,
};

export { Room, RoomBackgroundTheme };


let ROOM_THEME_TILES = {};
ROOM_THEME_TILES[RoomBackgroundTheme.Dungeon] = [
    new Frame({src: require("../../../../resources/wize/tiles/medieval/tile13.png")}),
    new Frame({src: require("../../../../resources/wize/tiles/medieval/tile4.png")}),
    new Frame({src: require("../../../../resources/wize/tiles/medieval/tile10.png")}),
]