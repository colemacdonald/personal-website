import { util } from "../../util";
import { Direction, Frame, State } from "../Frames";
import { MovingSprite } from "./MovingSprite";

class Monster extends MovingSprite {
    speed: number;
    platform: Rectangle;
    xv: number;

    constructor(options: {x: number, y: number, platform: Rectangle, monsterType: MonsterType}) {
        super(monsterTypes[options.monsterType]);

        this.state = State.Walking;
        this.direction = Direction.Right;

        this.x = options.x;
        this.y = options.y;
        this.platform = options.platform;

        this.y = options.platform.y - monsterTypes[options.monsterType].h;

        this.h = monsterTypes[options.monsterType].h;
        this.w = monsterTypes[options.monsterType].w;
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
}

enum MonsterType {
    Centipede,
    Turtle,
    Bloated,
    Scorpion,
    Vulture,
}

let monsterTypes = {};
let h = 33;
let w = 46;
monsterTypes[MonsterType.Centipede] = { h: h, w: w, speed: 0.75 }
monsterTypes[MonsterType.Centipede][State.Walking] = {};
monsterTypes[MonsterType.Centipede][State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Centipede][State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];


h = 42;
w = 64;
monsterTypes[MonsterType.Scorpion] = { h: h, w: w, speed: 0.75 }
monsterTypes[MonsterType.Scorpion][State.Walking] = {};
monsterTypes[MonsterType.Scorpion][State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Scorpion][State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/scorpion/walk/scorpion-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];

h = 19;
w = 37;
monsterTypes[MonsterType.Vulture] = { h: h, w: w, speed: 1.5 }
monsterTypes[MonsterType.Vulture][State.Walking] = {};
monsterTypes[MonsterType.Vulture][State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-right-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];
monsterTypes[MonsterType.Vulture][State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-001.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-002.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-003.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/vulture/walk/vulture-walk-left-004.png"), ticks: 16 , hitBoxes: [{ x: 0, y: 0, h: h, w: w }] }),
];

export { Monster, MonsterType };
