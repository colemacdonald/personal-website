import { ControllableCharacter } from "./ControllableCharacter";
import { EmptyImageFrame, KYeezyFrames } from "./KYeezyFrames";
import { Frame, State } from "../Frames";
import { Monster } from "../sprites/Monster";

class KYeezy extends ControllableCharacter {
    state: State;

    attackDuration: number = 20;
    attackFrameCounter: number = 0;

    onHitInvincibilityFrames: number = 60;
    onHitInvincibilityCounter: number = 0;
    invincible: boolean = false;

    constructor(options: any) {
    
        // Call super class constructor
        super(KYeezy.addOpts(options));

        // For the getFrame fsm
        this.state = State.Idle;

        this.healthPoints = 3;
    }

    private static addOpts(opts) {
        opts.speed = 4;

        opts.h = 80;
        opts.w = 40;

        // set frames
        opts.frames = KYeezyFrames;

        return opts;
    }

    // override
    getFrame(): Frame {
        if (this.invincible && (this.onHitInvincibilityCounter % 4 === 0 || this.onHitInvincibilityCounter % 4 === 1)) {
            EmptyImageFrame.copyFrom(super.getFrame());
            return EmptyImageFrame;
        }

        return super.getFrame();
    }

    tick() {
        super.move();
        this.updateState();
        this.incrementFrameCounter();

        if (this.invincible) {
            this.onHitInvincibilityCounter++;
            if (this.onHitInvincibilityCounter > this.onHitInvincibilityFrames) {
                this.onHitInvincibilityCounter = 0;
                this.invincible = false;
            }
        }
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

    onHit() {
        if (!this.invincible) {
            this.healthPoints--;
            this.invincible = true;
        }
    }
}

export { KYeezy };
