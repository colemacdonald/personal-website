import { Powerup } from "./Powerup";
import { Coin } from "./sprites/Coin";
import Door from "./sprites/Door";
import { Monster } from "./sprites/Monster";

type Room = {
    h: number,
    w: number,
    platforms: Array<Rectangle>,
    monsters: Array<Monster>,
    coins: Array<Coin>,
    doors: Array<Door>,
    powerups: Array<Powerup>
}

export { Room };