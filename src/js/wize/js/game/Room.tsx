import { Frame } from "./Frames";
import { Powerup } from "./Powerup";
import { Coin } from "./sprites/Coin";
import Door from "./sprites/Door";
import { Monster } from "./sprites/Monster";
import { RoomBackgroundTheme, RoomTheme, RoomThemes } from "./tiles/RoomThemes";

class Room {
    h: number;
    w: number;
    platforms: Array<Rectangle> = [];
    damageZones: Array<Rectangle> = [];
    monsters: Array<Monster> = [];
    coins: Array<Coin> = [];
    doors: Array<Door> = [];
    powerups: Array<Powerup> = [];
    backgroundElements: Array<ISprite> = [];
    backgroundTheme: RoomTheme = RoomThemes[RoomBackgroundTheme.Outside];
    hasCeiling: boolean = false;

    constructor(options) {
        this.h = options.h;
        this.w = options.w;
    }

    getBackgroundThemeTile(x: number, y: number): Frame {
        let index = (Math.floor(x / 50) + Math.floor(y / 50)) % this.backgroundTheme.backgroundTiles.length;

        return this.backgroundTheme.backgroundTiles[index];
    }
};

export { Room };
