import { Frame, State } from "./Frames";
import { Coin } from "./sprites/Coin";
import { StationarySprite } from "./sprites/StationarySprite";

export class Powerup {
    sprite: StationarySprite;
    name: string;
    instructions: string;
    method: Function;
    pauseDuration: number;

    constructor(p: {x: number, y: number, name: string, method: Function, instructions: string, pauseDuration: number, frames: any, scale: number}) {
        this.sprite = new StationarySprite(p);
        this.name = p.name;
        this.method = p.method;
        this.pauseDuration = p.pauseDuration;
        this.instructions = p.instructions;
    }

    public static Health(x: number, y: number): Powerup {
        return new Powerup({x: x, y: y, name: "Health", instructions: "", pauseDuration: 0, frames: PowerupFrames[PowerupSpriteType.Heart], scale: 1, method: c => { 
            c.healthPoints++; 
            let audio = new Audio(c.healthUpAudioSrc);
            audio.play();
        } });
    }

    public static IncreaseJumps(x: number, y: number, newMaxJmpCnt: number, name: string): Powerup {
        return new Powerup ({x: x, y: y, name: name, instructions: `You can now jump ${newMaxJmpCnt} times.`, pauseDuration: 180, scale: 2, frames: PowerupFrames[PowerupSpriteType.KCoin], method: c => {
            c.maxJmpCnt = newMaxJmpCnt;
        }});
    }

    public static Speed(x: number, y: number): Powerup {
        return new Powerup({x: x, y: y, name: "Speed Boost", instructions: "Press space to move fast!", pauseDuration: 180, scale: 1, frames: PowerupFrames[PowerupSpriteType.Run], method: c => {
            c.canRun = true;
        }});
    }

    public static Complete(x: number, y: number): Powerup {
        return new Powerup({x: x, y: y, name: "World domination", instructions: "Congratulations! Compete against your friends for the fastest finish.", pauseDuration: 500, scale: 2, frames: PowerupFrames[PowerupSpriteType.KCoin], method: c => {}});
    }
}

export enum PowerupSpriteType {
    KCoin,
    Heart,
    Run,
}

let PowerupFrames = {};
PowerupFrames[PowerupSpriteType.KCoin] = {};
PowerupFrames[PowerupSpriteType.KCoin][State.Idle] = [
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0000.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0001.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0002.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0003.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0004.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0005.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0006.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0007.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0008.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0009.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0010.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0011.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0012.png"), ticks: 2}),
    new Frame({src: require("../../../../resources/wize/powerups/coin/coin0013.png"), ticks: 2})
];

PowerupFrames[PowerupSpriteType.Heart] = {};
PowerupFrames[PowerupSpriteType.Heart][State.Idle] = [
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0065_heart.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0064_heart2.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0063_heart3.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0062_heart4.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0061_heart5.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0060_heart6.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0059_heart7.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0058_heart8.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0057_heart9.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/heart/000_0056_heart10.png"), ticks: 4}),
];

PowerupFrames[PowerupSpriteType.Run] = {};
PowerupFrames[PowerupSpriteType.Run][State.Idle] = [
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0035_speed1.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0034_speed2.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0033_speed3.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0032_speed4.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0031_speed5.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0030_speed6.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0029_speed7.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0028_speed8.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0027_speed9.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0026_speed10.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0025_speed11.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0024_speed12.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0023_speed13.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0022_speed14.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0021_speed15.png"), ticks: 4}),
    new Frame({src: require("../../../../resources/wize/powerups/speed/000_0020_speed16.png"), ticks: 4}),
];
