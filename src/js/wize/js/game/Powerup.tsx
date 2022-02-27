import { Coin } from "./sprites/Coin";

class Powerup {
    coin: Coin;
    name: string;
    method: Function;

    constructor(p: {x: number, y: number, name: string, method: Function}) {
        this.coin = new Coin({x: p.x, y: p.y});
        this.name = p.name;
        this.method = p.method;
    }

    public static Health(x: number, y: number): Powerup {
        return new Powerup({x: x, y: y, name: "Health", method: c => { 
            c.healthPoints++; 
            let audio = new Audio(c.healthUpAudioSrc);
            audio.play();
        } });
    }
}

export { Powerup }