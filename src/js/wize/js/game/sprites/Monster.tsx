import { util } from "../../util";
import { Direction, Frame, State } from "../Frames";
import { MovingSprite } from "./MovingSprite";

class Monster extends MovingSprite {
    speed: number;
    platform: Rectangle;
    xv: number;

    hitAudioSrc: string = require("../../../../../resources/wize/audio/sound-effects/monster-death1.mp3");
    audio: any = null;

    constructor(options: {x: number, y: number, platform: Rectangle, monsterType: MonsterType}) {
        super({frames: monsterTypes[options.monsterType].frames, x: options.x, y: options.y, scale: 1});

        this.state = State.Walking;
        this.direction = Direction.Right;

        this.x = options.x;
        this.y = options.y;
        this.platform = options.platform;

        this.y = options.platform.y - monsterTypes[options.monsterType].h;

        this.h = monsterTypes[options.monsterType].h;
        this.w = monsterTypes[options.monsterType].w;
        this.x = this.platform.x + 10 + Math.random() * (this.platform.w - this.w - 20);
        this.speed = monsterTypes[options.monsterType].speed;

        this.xv = this.speed;
    }

    move() {
        //these walk back and forth on platforms
        if (
            this.x < this.platform.x + 3 ||
            this.x + this.w > this.platform.x + this.platform.w - 3
        ) {
            this.xv *= -1;
            this.direction = this.xv < 0 ? Direction.Left : Direction.Right;
        }

        this.x += this.xv;

        this.incrementFrameCounter();
    }

    onHit(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.audio) {
                this.audio = new Audio();
                this.audio.volume = 0.8;
                this.audio.src = this.hitAudioSrc;
                this.audio.onended = (e) => { this.audio = null; }
                this.audio.play();
                resolve();
            }
        });
    }
}

enum MonsterType {
    Centipede,
    // Turtle,
    // Bloated,
    Scorpion,
    Vulture,
    OneEyedBat
}

let monsterTypes = {};
let h = 33;
let w = 46;
monsterTypes[MonsterType.Centipede] = { h: h, w: w, speed: 0.75, frames: {} }
monsterTypes[MonsterType.Centipede].frames[State.Walking] = {};
monsterTypes[MonsterType.Centipede].frames[State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Centipede].frames[State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];


h = 42;
w = 64;
monsterTypes[MonsterType.Scorpion] = { h: h, w: w, speed: 0.75, frames: {} }
monsterTypes[MonsterType.Scorpion].frames[State.Walking] = {};
monsterTypes[MonsterType.Scorpion].frames[State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Scorpion].frames[State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];

h = 19;
w = 37;
monsterTypes[MonsterType.Vulture] = { h: h, w: w, speed: 1.5, frames: {} }
monsterTypes[MonsterType.Vulture].frames[State.Walking] = {};
monsterTypes[MonsterType.Vulture].frames[State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Vulture].frames[State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];

monsterTypes[MonsterType.OneEyedBat] = {h: 39, w: 39, speed: 3, frames: {}};
monsterTypes[MonsterType.OneEyedBat].frames[State.Walking] = {};
monsterTypes[MonsterType.OneEyedBat].frames[State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right1.png"), ticks: 16 , hitBoxes: [{ x: 14, y: 14, h: 20, w: 20 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right2.png"), ticks: 16 , hitBoxes: [{ x: 16, y: 16, h: 16, w: 16 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right3.png"), ticks: 16 , hitBoxes: [{ x: 16, y: 16, h: 16, w: 16 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right4.png"), ticks: 16 , hitBoxes: [{ x: 6, y: 14, h: 22, w: 31 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right5.png"), ticks: 16 , hitBoxes: [{ x: 6, y: 6, h: 31, w: 31 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-right6.png"), ticks: 16 , hitBoxes: [{ x: 7, y: 7, h: 29, w: 31 }] }),
];
monsterTypes[MonsterType.OneEyedBat].frames[State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left1.png"), ticks: 16 , hitBoxes: [{ x: 9, y: 14, h: 20, w: 20 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left2.png"), ticks: 16 , hitBoxes: [{ x: 11, y: 16, h: 16, w: 16 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left3.png"), ticks: 16 , hitBoxes: [{ x: 11, y: 16, h: 16, w: 16 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left4.png"), ticks: 16 , hitBoxes: [{ x: 6, y: 14, h: 22, w: 31 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left5.png"), ticks: 16 , hitBoxes: [{ x: 6, y: 6, h: 31, w: 31 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/one-eyed-bat/one-eyed-bat-left6.png"), ticks: 16 , hitBoxes: [{ x: 7, y: 7, h: 29, w: 31 }] }),
];

export { Monster, MonsterType };
