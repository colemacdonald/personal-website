import { ControllableCharacter } from "./ControllableCharacter";
import { FRAMES } from "./KYeezyFrames";
import { State } from "../Frames";

class KYeezy extends ControllableCharacter {
    state: State;

    constructor(options: any) {
        options.speed = 4;

        options.h = 80;
        options.w = 40;

        // set frames
        options.frames = FRAMES;

        // Call super class constructor
        super(options);

        // For the getFrame fsm
        this.state = State.Idle;
    }

    move() {
        super.move();
        this.updateState();
        this.incrementFrameCounter();
    }

    updateState() {
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
}

export { KYeezy };
