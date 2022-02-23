import { ControllableCharacter } from "./ControllableCharacter";
import { FRAMES } from "./KYeezyFrames";
import { State } from "../Frames";

class KYeezy extends ControllableCharacter {
    state: State;

    attackDuration: number = 20;
    attackFrameCounter: number = 0;

    constructor(options: any) {
    
        // Call super class constructor
        super(KYeezy.addOpts(options));

        // For the getFrame fsm
        this.state = State.Idle;
    }

    private static addOpts(opts) {
        opts.speed = 4;

        opts.h = 80;
        opts.w = 40;

        // set frames
        opts.frames = FRAMES;

        return opts;
    }

    move() {
        super.move();
        this.updateState();
        this.incrementFrameCounter();
    }

    updateState() {
        if (this.state === State.Attacking) {
            this.attackFrameCounter++;

            if (this.attackFrameCounter === this.attackDuration) {
                this.attackFrameCounter = 0;
            } else {
                return;
            }
        }

        /// landing
        if (this.state === State.InAir && this.xv === 0) {
        }

        if (this.onG) {
            if (this.xv === 0) {
                this.state = State.Idle;
            } else {
                this.state = State.Walking;
            }
        } else {
            this.state = State.InAir;
        }
    }

    // override
    attack() {
        this.state = State.Attacking;
    }
}

export { KYeezy };
