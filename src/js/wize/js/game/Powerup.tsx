import { Frame, State } from "./Frames";
import { Coin } from "./sprites/Coin";
import { StationarySprite } from "./sprites/StationarySprite";

class Powerup {
    sprite: StationarySprite;
    name: string;
    instructions: string;
    method: Function;
    pauseDuration: number;

    constructor(p: {x: number, y: number, name: string, method: Function, instructions: string, pauseDuration: number, frames: any}) {
        this.sprite = new StationarySprite({scale: 1, ...p});
        this.name = p.name;
        this.method = p.method;
    }

    public static Health(x: number, y: number): Powerup {
        return new Powerup({x: x, y: y, name: "Health", instructions: "", pauseDuration: 0, frames: PowerupFrames[PowerupSpriteType.Heart], method: c => { 
            c.healthPoints++; 
            let audio = new Audio(c.healthUpAudioSrc);
            audio.play();
        } });
    }

    public static IncreaseJumps(x: number, y: number, newMaxJmpCnt: number, name: string): Powerup {
        return new Powerup ({x: x, y: y, name: name, instructions: "You can now jump {newMaxJmpCnt} times.", pauseDuration: 180, frames: PowerupFrames[PowerupSpriteType.KCoin], method: c => {
            c.maxJmpCnt = newMaxJmpCnt;
        }});
    }
}

enum PowerupSpriteType {
    KCoin,
    Heart,
}

let PowerupFrames = {};
PowerupFrames[PowerupSpriteType.KCoin] = {};
PowerupFrames[PowerupSpriteType.KCoin][State.Idle] = [
    new Frame({src: require("../../../../resources/wize/coin/coin0000.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0001.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0002.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0003.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0004.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0005.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0006.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0007.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0008.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0009.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0010.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0011.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0012.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/coin/coin0013.png"), ticks: 2})
];

PowerupFrames[PowerupSpriteType.Heart] = {};
PowerupFrames[PowerupSpriteType.Heart][State.Idle] = [
    new Frame({src: require("../../../../resources/wize/hearts/000_0065_heart.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0064_heart2.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0063_heart3.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0062_heart4.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0061_heart5.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0060_heart6.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0059_heart7.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0058_heart8.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0057_heart9.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/hearts/000_0056_heart10.png"), ticks: 4}),
];

export { Powerup }