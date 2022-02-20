import { Coin } from "./sprites/Coin";

type Powerup = {
    coin: Coin,
    name: string,
    method: Function
}

export { Powerup }