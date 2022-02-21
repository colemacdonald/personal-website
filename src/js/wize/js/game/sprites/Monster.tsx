import { util } from "../../util";
import { Direction, Frame, State } from "../Frames";
import { MovingSprite } from "./MovingSprite";

class Monster extends MovingSprite {
    speed: number;
    platform: Rectangle;
    xv: number;

    constructor(options: {x: number, y: number, platform: Rectangle, monsterType: MonsterType}) {
        super(monsterTypes[MonsterType.Centipede]);

        this.state = State.Walking;
        this.direction = Direction.Right;

        this.x = options.x;
        this.y = options.y;
        this.platform = options.platform;

        this.h = monsterTypes[options.monsterType].h;
        this.w = monsterTypes[options.monsterType].w;
        this.speed = monsterTypes[options.monsterType].speed;

        this.xv = this.speed;
    }

    get box(): Rectangle {
        let frame = this.getFrame();
        return { x: this.x + frame.x_offset, y: this.y, w: this.w + frame.width_extend, h: this.h };
    }

    move() {
        //these walk back and forth on platforms
        if (
            this.x < this.platform.x + 10 ||
            this.x + this.w > this.platform.x + this.platform.w - 10
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
    Bloated
}

let monsterTypes = {};
monsterTypes[MonsterType.Centipede] = { h: 33, w: 46, speed: 0.75 }
monsterTypes[MonsterType.Centipede][State.Walking] = {};
monsterTypes[MonsterType.Centipede][State.Walking][Direction.Right] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-001.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-002.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-003.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-right-004.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
];
monsterTypes[MonsterType.Centipede][State.Walking][Direction.Left] = [
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-001.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-002.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-003.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
    new Frame({src: require("../../../../../resources/wize/monsters/centipede/walk/centipede-walk-left-004.png"), ticks: 16 , hurtBoxes: [{ x: 0, y: 0, h: 33, w: 46 }] }),
];


util.bootstrapFrames(monsterTypes[MonsterType.Centipede]);

export { Monster, MonsterType };
